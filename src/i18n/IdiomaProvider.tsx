"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { IDIOMA_POR_DEFECTO, esIdioma } from "./config";
import type { Idioma } from "./config";
import { diccionarios } from "./textos";
import type { Diccionario } from "./tipos";

const CLAVE_GUARDADO = "idioma";

// --- Idioma elegido: se guarda en el navegador para recordarlo en la próxima visita ---

let enMemoria: Idioma | null = null;
const oyentes = new Set<() => void>();

function leerGuardado(): Idioma {
  try {
    const guardado = localStorage.getItem(CLAVE_GUARDADO);
    if (guardado && esIdioma(guardado)) return guardado;
  } catch {
    // Navegador sin almacenamiento (ej: ventana privada): se usa solo la memoria
  }
  return IDIOMA_POR_DEFECTO;
}

function leerIdioma(): Idioma {
  enMemoria ??= leerGuardado();
  return enMemoria;
}

function guardarIdioma(idioma: Idioma) {
  enMemoria = idioma;
  try {
    localStorage.setItem(CLAVE_GUARDADO, idioma);
  } catch {
    // Si no se puede guardar, el cambio igual funciona hasta cerrar la página
  }
  oyentes.forEach((avisar) => avisar());
}

function suscribir(avisar: () => void) {
  oyentes.add(avisar);

  // Si se cambia el idioma en otra pestaña, esta se actualiza también
  const alCambiarOtraPestana = (e: StorageEvent) => {
    if (e.key !== CLAVE_GUARDADO) return;
    enMemoria = null;
    avisar();
  };
  window.addEventListener("storage", alCambiarOtraPestana);

  return () => {
    oyentes.delete(avisar);
    window.removeEventListener("storage", alCambiarOtraPestana);
  };
}

// --- Contexto ---

type ValorIdioma = {
  idioma: Idioma;
  /** Todos los textos del idioma actual */
  t: Diccionario;
  cambiarIdioma: (nuevo: Idioma) => void;
};

const ContextoIdioma = createContext<ValorIdioma | null>(null);

export function IdiomaProvider({ children }: { children: ReactNode }) {
  // El servidor y la primera carga siempre muestran español; después se aplica lo guardado
  const idioma = useSyncExternalStore(suscribir, leerIdioma, () => IDIOMA_POR_DEFECTO);

  // Mantiene el atributo lang de la página al día (lo usan lectores de pantalla y traductores)
  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  const valor: ValorIdioma = {
    idioma,
    t: diccionarios[idioma],
    cambiarIdioma: guardarIdioma,
  };

  return <ContextoIdioma.Provider value={valor}>{children}</ContextoIdioma.Provider>;
}

/** Devuelve el idioma actual, los textos y la función para cambiar de idioma */
export function useIdioma(): ValorIdioma {
  const valor = useContext(ContextoIdioma);
  if (!valor) throw new Error("useIdioma debe usarse dentro de <IdiomaProvider>");
  return valor;
}