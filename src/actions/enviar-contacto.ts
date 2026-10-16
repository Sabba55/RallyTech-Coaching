"use server";

import programas from "@/data/programas.json";
import { getResend } from "@/utils/resend";
import { PAISES, EXPERIENCIAS } from "@/data/opciones-contacto";
import type { DatosContacto, RespuestaContacto } from "@/types/contacto";

const EXPERIENCIA_LABEL: Record<string, string> = Object.fromEntries(
  EXPERIENCIAS.map((e) => [e.value, e.label])
);

const OPCIONES: Record<string, string> = {
  ...Object.fromEntries(programas.map((p) => [p.id, p.nombre])),
  "no-seguro": "No estoy seguro",
};

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
    return {
      ok: false,
      error:
        "Completá nombre, correo electrónico, país, experiencia y el programa de interés.",
      valores,
    };
  }
  if (!EMAIL_RE.test(valores.email)) {
    return { ok: false, error: "El correo electrónico no es válido.", valores };
  }
  if (!(valores.programa in OPCIONES)) {
    return { ok: false, error: "Elegí una opción en \"Interesado en\".", valores };
  }

  if (!PAISES.includes(valores.pais)) {
    return { ok: false, error: "Elegí un país de la lista.", valores };
  }

  if (!(valores.experiencia in EXPERIENCIA_LABEL)) {
    return { ok: false, error: "Elegí una opción de experiencia válida.", valores };
  }

  const receptor = process.env.RECEPTOR_EMAIL;
  if (!receptor || !process.env.RESEND_API_KEY) {
    console.error("Faltan RESEND_API_KEY o RECEPTOR_EMAIL en las variables de entorno");
    return {
      ok: false,
      error: "No pudimos enviar tu consulta. Intentá de nuevo más tarde.",
      valores,
    };
  }

  try {
    const { error } = await getResend().emails.send({
      from: "Rallytech Web <onboarding@resend.dev>", // cambiar al verificar el dominio
      to: receptor,
      replyTo: valores.email,
      subject: `Nueva consulta de ${valores.nombre.replace(/[\r\n]+/g, " ")}`,
      text: [
        `Nombre: ${valores.nombre}`,
        `Correo: ${valores.email}`,
        `País: ${valores.pais}`,
        `Experiencia: ${EXPERIENCIA_LABEL[valores.experiencia]}`,
        `Interesado en: ${OPCIONES[valores.programa]}`,
        "",
        "¿Qué quiere mejorar?",
        valores.mensaje || "(sin mensaje)",
      ].join("\n"),
    });

    if (error) {
      console.error("Error de Resend:", error);
      return {
        ok: false,
        error: "No pudimos enviar tu consulta. Intentá de nuevo más tarde.",
        valores,
      };
    }
    return { ok: true };
  } catch (e) {
    console.error("Error al enviar el contacto:", e);
    return {
      ok: false,
      error: "No pudimos enviar tu consulta. Intentá de nuevo más tarde.",
      valores,
    };
  }
}