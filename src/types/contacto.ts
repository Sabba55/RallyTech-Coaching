export type ProgramaInteres = "online" | "training" | "performance" | "";

export interface DatosContacto {
  nombre: string;
  email: string;
  programa: ProgramaInteres;
  mensaje: string;
}

export interface RespuestaContacto {
  ok: boolean;
  error?: string;
}