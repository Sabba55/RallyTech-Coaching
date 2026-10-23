// Plantilla HTML del mail de nueva consulta que le llega a Samir.
// Usa tablas y estilos en línea porque los clientes de mail (Gmail, Outlook) no soportan CSS moderno.

const VERDE = "#27f444";
const NEGRO = "#050505";
const GRIS_900 = "#111111";
const GRIS_700 = "#2a2a2a";
const GRIS_400 = "#9a9a9a";
const GRIS_100 = "#e6e6e6";

export interface DatosMail {
  nombre: string;
  email: string;
  pais: string;
  experiencia: string;
  programa: string;
  mensaje: string;
  idioma: "es" | "en";
}

// Evita que el texto del usuario rompa el HTML o inyecte código en el mail
function escapar(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fila(etiqueta: string, valor: string) {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${GRIS_700};">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GRIS_400};margin-bottom:4px;">${etiqueta}</div>
        <div style="font-size:16px;font-weight:600;color:${GRIS_100};">${valor}</div>
      </td>
    </tr>`;
}

// Fila con dos columnas del mismo ancho (país | experiencia)
function filaDoble(
  etiquetaIzq: string,
  valorIzq: string,
  etiquetaDer: string,
  valorDer: string
) {
  const celda = (etiqueta: string, valor: string, extra: string) => `
        <td width="50%" valign="top" style="padding:14px 0;border-bottom:1px solid ${GRIS_700};${extra}">
          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GRIS_400};margin-bottom:4px;">${etiqueta}</div>
          <div style="font-size:16px;font-weight:600;color:${GRIS_100};">${valor}</div>
        </td>`;
  return `
    <tr>
      <td style="padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>${celda(etiquetaIzq, valorIzq, "padding-right:12px;")}${celda(etiquetaDer, valorDer, "padding-left:12px;")}
          </tr>
        </table>
      </td>
    </tr>`;
}

export function htmlConsulta(d: DatosMail) {
  const nombre = escapar(d.nombre);
  const email = escapar(d.email);
  const mensaje = d.mensaje
    ? escapar(d.mensaje).replace(/\n/g, "<br />")
    : `<span style="color:${GRIS_400};">(sin mensaje)</span>`;
  const idioma = d.idioma === "en" ? "Inglés" : "Español";

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>Nueva consulta de ${nombre}</title>
  </head>
  <body style="margin:0;padding:0;background:${NEGRO};font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NEGRO};padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

            <!-- Encabezado -->
            <tr>
              <td style="padding:0 0 20px 0;text-align:center;">
                <div style="font-size:22px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#ffffff;">
                  RALLY<span style="color:${VERDE};">TECH</span> COACHING
                </div>
              </td>
            </tr>

            <!-- Tarjeta -->
            <tr>
              <td style="background:${GRIS_900};border:1px solid ${GRIS_700};border-radius:10px;overflow:hidden;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="height:4px;background:${VERDE};font-size:0;line-height:0;">&nbsp;</td></tr>
                  <tr>
                    <td style="padding:32px 28px 8px 28px;">
                      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${VERDE};font-weight:700;">Nueva consulta</div>
                      <div style="font-size:26px;line-height:1.25;font-weight:800;color:#ffffff;margin-top:8px;">${nombre}</div>
                      <div style="font-size:14px;color:${GRIS_400};margin-top:6px;">quiere hablar con vos desde la web</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:8px 28px 0 28px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${fila("Correo", `<a href="mailto:${email}" style="color:${VERDE};text-decoration:none;">${email}</a>`)}
                        ${filaDoble("País", escapar(d.pais), "Experiencia", escapar(d.experiencia))}
                        ${fila("Interesado en", escapar(d.programa))}
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:22px 28px 8px 28px;">
                      <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GRIS_400};margin-bottom:10px;">¿Qué quiere mejorar?</div>
                      <div style="background:${NEGRO};border-left:3px solid ${VERDE};border-radius:6px;padding:16px 18px;font-size:15px;line-height:1.6;color:${GRIS_100};">
                        ${mensaje}
                      </div>
                    </td>
                  </tr>

                  <!-- Botón de respuesta -->
                  <tr>
                    <td align="center" style="padding:28px 28px 32px 28px;">
                      <a href="mailto:${email}?subject=${encodeURIComponent("Consulta Rallytech Coaching")}"
                         style="display:inline-block;background:${VERDE};color:${NEGRO};font-size:14px;font-weight:800;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:10px;">
                        Responder a ${nombre.split(" ")[0]}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Pie -->
            <tr>
              <td style="padding:20px 8px 0 8px;text-align:center;font-size:12px;line-height:1.6;color:${GRIS_400};">
                Idioma de la web: ${idioma} &middot; Mensaje enviado desde el formulario de contacto de Rallytech Coaching
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}