// Límite básico de envíos del formulario, guardado en memoria del servidor.

const intentos = new Map<string, number[]>();

interface Regla {
  max: number; // cantidad máxima de envíos
  ventanaMs: number; // dentro de este período
}

// Por visitante: 3 consultas cada 10 minutos
export const REGLA_POR_IP: Regla = { max: 3, ventanaMs: 10 * 60 * 1000 };
// En total: 30 consultas por hora, para no agotar el cupo diario de Resend
export const REGLA_GLOBAL: Regla = { max: 30, ventanaMs: 60 * 60 * 1000 };

/** Devuelve true si la clave superó el límite; si no, registra este intento. */
export function superaLimite(clave: string, regla: Regla): boolean {
  const ahora = Date.now();
  const recientes = (intentos.get(clave) ?? []).filter((t) => ahora - t < regla.ventanaMs);

  if (recientes.length >= regla.max) {
    intentos.set(clave, recientes);
    return true;
  }

  recientes.push(ahora);
  intentos.set(clave, recientes);

  // Limpieza ocasional para que el Map no crezca sin límite
  if (intentos.size > 5000) {
    for (const [k, marcas] of intentos) {
      if (marcas.every((t) => ahora - t >= REGLA_GLOBAL.ventanaMs)) intentos.delete(k);
    }
  }
  return false;
}