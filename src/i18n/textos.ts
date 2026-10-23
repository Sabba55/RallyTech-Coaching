import es from "./diccionarios/es.json";
import en from "./diccionarios/en.json";
import type { Idioma } from "./config";
import type { Diccionario } from "./tipos";

// Si al inglés le falta o le sobra alguna clave respecto del español, TypeScript avisa acá
export const diccionarios: Record<Idioma, Diccionario> = { es, en };