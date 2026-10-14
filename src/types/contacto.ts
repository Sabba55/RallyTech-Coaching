export interface DatosContacto {
  nombre: string;
  email: string;
  programa: string;
  mensaje: string;
}

export interface RespuestaContacto {
  ok: boolean;
  error?: string;
  valores?: DatosContacto; // para no perder lo escrito si falla
}