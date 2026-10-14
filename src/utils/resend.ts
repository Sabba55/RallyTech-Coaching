import { Resend } from "resend";

let cliente: Resend | null = null;

// Se crea recién al enviar, así el build no falla si falta la clave
export function getResend() {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) throw new Error("Falta RESEND_API_KEY");
  cliente ??= new Resend(clave);
  return cliente;
}