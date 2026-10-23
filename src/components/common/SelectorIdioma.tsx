"use client";

import { useEffect, useId, useRef, useState } from "react";
import Bandera from "@/components/ui/Bandera";
import { IDIOMAS } from "@/i18n/config";
import { useIdioma } from "@/i18n/IdiomaProvider";

export default function SelectorIdioma({ className = "" }: { className?: string }) {
  const { idioma, t, cambiarIdioma } = useIdioma();
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);
  const idLista = useId();

  // Se cierra al hacer click afuera o al apretar Escape
  useEffect(() => {
    if (!abierto) return;

    const alHacerClick = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    const alApretarTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };

    document.addEventListener("mousedown", alHacerClick);
    document.addEventListener("keydown", alApretarTecla);
    return () => {
      document.removeEventListener("mousedown", alHacerClick);
      document.removeEventListener("keydown", alApretarTecla);
    };
  }, [abierto]);

  return (
    <div ref={contenedor} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls={idLista}
        aria-label={`${t.selectorIdioma.etiqueta}: ${t.selectorIdioma.nombres[idioma]}`}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-[10px] border border-gris-400 px-3 transition duration-200 hover:border-verde"
      >
        <Bandera idioma={idioma} className="h-4 w-6 rounded-[2px]" />
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 text-gris-400 transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {abierto && (
        <ul
          id={idLista}
          className="absolute right-0 top-full z-50 mt-2 w-40 rounded-[10px] border border-gris-700 bg-negro p-1 shadow-lg"
        >
          {IDIOMAS.map((i) => (
            <li key={i}>
              <button
                type="button"
                lang={i}
                aria-current={i === idioma ? "true" : undefined}
                onClick={() => {
                  cambiarIdioma(i);
                  setAbierto(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm normal-case not-italic tracking-normal transition hover:bg-gris-900 ${
                  i === idioma ? "text-verde" : ""
                }`}
              >
                <Bandera idioma={i} className="h-4 w-6 rounded-[2px]" />
                {t.selectorIdioma.nombres[i]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}