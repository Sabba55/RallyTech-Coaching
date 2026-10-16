export interface DatosContacto {
  nombre: string;
  email: string;
  pais: string;
  experiencia: string;
  programa: string;
  mensaje: string;
}

export interface RespuestaContacto {
  ok: boolean;
  error?: string;
  valores?: DatosContacto;
}