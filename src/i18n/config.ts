// Idiomas disponibles en el sitio
export const IDIOMAS = ["es", "en"] as const;

export type Idioma = (typeof IDIOMAS)[number];

// El sitio siempre arranca en español (también es lo que ve Google)
export const IDIOMA_POR_DEFECTO: Idioma = "es";

/** Indica si un texto cualquiera (ej: lo guardado en el navegador) es un idioma válido */
export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}