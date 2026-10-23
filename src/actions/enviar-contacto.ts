"use server";

import { headers } from "next/headers";
import { getResend } from "@/utils/resend";
import { htmlConsulta } from "@/utils/plantilla-email";
import { superaLimite, REGLA_POR_IP, REGLA_GLOBAL } from "@/utils/limite-envios";
import { PAISES, EXPERIENCIAS } from "@/data/opciones-contacto";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/i18n/config";
import { diccionarios } from "@/i18n/textos";
import type { DatosContacto, RespuestaContacto } from "@/types/contacto";

const EXPERIENCIA_LABEL: Record<string, string> = Object.fromEntries(
  EXPERIENCIAS.map((e) => [e.value, e.label])
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limpiar(valor: FormDataEntryValue | null, max: number) {
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

export async function enviarContacto(
  _estado: RespuestaContacto | null,
  formData: FormData
): Promise<RespuestaContacto> {
  // Campo trampa para bots: una persona real nunca lo ve ni lo completa
  if (limpiar(formData.get("sitioWeb"), 100)) return { ok: true };

  // Idioma del formulario: define en qué idioma se devuelven los mensajes de error
  const idiomaEnviado = limpiar(formData.get("idioma"), 5);
  const idioma = esIdioma(idiomaEnviado) ? idiomaEnviado : IDIOMA_POR_DEFECTO;
  const { errores } = diccionarios[idioma];

  // Los nombres de los programas son iguales en todos los idiomas; se toman del español
  // porque el mail le llega a Samir en español
  const { programas } = diccionarios.es;
  const OPCIONES: Record<string, string> = {
    ...Object.fromEntries(programas.lista.map((p) => [p.id, p.nombre])),
    "no-seguro": "No estoy seguro",
  };

  const valores: DatosContacto = {
    nombre: limpiar(formData.get("nombre"), 100),
    email: limpiar(formData.get("email"), 150),
    pais: limpiar(formData.get("pais"), 60),
    experiencia: limpiar(formData.get("experiencia"), 30),
    programa: limpiar(formData.get("programa"), 30),
    mensaje: limpiar(formData.get("mensaje"), 2000),
  };

  // Validación en el servidor (no depender solo del navegador)
  if (
    !valores.nombre ||
    !valores.email ||
    !valores.pais ||
    !valores.experiencia ||
    !valores.programa
  ) {
    return { ok: false, error: errores.camposObligatorios, valores };
  }
  if (!EMAIL_RE.test(valores.email)) {
    return { ok: false, error: errores.emailInvalido, valores };
  }
  if (!(valores.programa in OPCIONES)) {
    return { ok: false, error: errores.programaInvalido, valores };
  }

  if (!PAISES.includes(valores.pais)) {
    return { ok: false, error: errores.paisInvalido, valores };
  }

  if (!(valores.experiencia in EXPERIENCIA_LABEL)) {
    return { ok: false, error: errores.experienciaInvalida, valores };
  }

  // Límite de envíos: por visitante y en total (se aplica recién acá para que un error de
  // tipeo en el formulario no gaste los intentos de una persona real)
  const cabeceras = await headers();
  const ip =
    cabeceras.get("x-nf-client-connection-ip") ??
    cabeceras.get("x-forwarded-for")?.split(",")[0].trim() ??
    "desconocida";
  if (superaLimite(`ip:${ip}`, REGLA_POR_IP) || superaLimite("global", REGLA_GLOBAL)) {
    return { ok: false, error: errores.demasiadosEnvios, valores };
  }

  const receptor = process.env.RECEPTOR_EMAIL;
  if (!receptor || !process.env.RESEND_API_KEY) {
    console.error("Faltan RESEND_API_KEY o RECEPTOR_EMAIL en las variables de entorno");
    return { ok: false, error: errores.envioFallido, valores };
  }

  try {
    const { error } = await getResend().emails.send({
      from: "Rallytech Web <onboarding@resend.dev>", // cambiar al verificar el dominio
      to: receptor,
      replyTo: valores.email,
      subject: `Nueva consulta de ${valores.nombre.replace(/[\r\n]+/g, " ")}`,
      html: htmlConsulta({
        nombre: valores.nombre,
        email: valores.email,
        pais: valores.pais,
        experiencia: EXPERIENCIA_LABEL[valores.experiencia],
        programa: OPCIONES[valores.programa],
        mensaje: valores.mensaje,
        idioma,
      }),
      // Versión en texto plano, por si el cliente de mail no muestra HTML
      text: [
        `Nombre: ${valores.nombre}`,
        `Correo: ${valores.email}`,
        `País: ${valores.pais}`,
        `Experiencia: ${EXPERIENCIA_LABEL[valores.experiencia]}`,
        `Interesado en: ${OPCIONES[valores.programa]}`,
        // Para que Samir sepa en qué idioma le conviene responder
        `Idioma de la web: ${idioma === "en" ? "Inglés (en)" : "Español (es)"}`,
        "",
        "¿Qué quiere mejorar?",
        valores.mensaje || "(sin mensaje)",
      ].join("\n"),
    });

    if (error) {
      console.error("Error de Resend:", error);
      return { ok: false, error: errores.envioFallido, valores };
    }
    return { ok: true };
  } catch (e) {
    console.error("Error al enviar el contacto:", e);
    return { ok: false, error: errores.envioFallido, valores };
  }
}