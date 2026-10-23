"use client";

import { useState } from "react";
import Image from "next/image";
import SelectorIdioma from "@/components/common/SelectorIdioma";
import { useIdioma } from "@/i18n/IdiomaProvider";

export default function Header() {
  const { t } = useIdioma();
  const textos = t.navegacion;
  const [abierto, setAbierto] = useState(false);

  const enlaces = [
    { href: "#inicio", texto: textos.inicio },
    { href: "#que-es", texto: textos.nosotros },
    { href: "#servicios", texto: textos.servicios },
    { href: "#metodos", texto: textos.metodos },
    { href: "#quien-soy", texto: textos.quienSoy },
    { href: "#contacto", texto: textos.contacto, destacado: true },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gris-700 bg-negro/90 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-5 md:px-9">

        <a href="#inicio" aria-label={textos.irAlInicio}>
            <Image
                src="/images/logo/logo-rallytech.png"
                alt="Rallytech Coaching by Samir Assaf"
                width={400}
                height={100}
                priority
                className="h-10 w-auto md:h-13"
            />
        </a>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-wide min-[911px]:flex">
          {enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className={
                e.destacado
                  ? "rounded-[10px] border-2 border-verde px-5 py-2 font-bold text-verde transition duration-200 hover:shadow-[0_0_18px_rgba(57,255,20,0.6)]"
                  : "transition hover:text-verde"
              }
            >
              {e.texto}
            </a>
          ))}

          {/* Selector de idioma: a la derecha de "Contacto" */}
          <SelectorIdioma />
        </nav>

        {/* En celular: selector de idioma + botón del menú */}
        <div className="flex items-center gap-4 min-[911px]:hidden">
          <SelectorIdioma />
          <button
            onClick={() => setAbierto(!abierto)}
            aria-label={textos.abrirMenu}
            aria-expanded={abierto}
          >
            <span className="text-2xl">{abierto ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {abierto && (
        <nav className="flex flex-col gap-4 border-t border-gris-700 bg-negro px-5 py-4 min-[911px]:hidden">
          {enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className="uppercase tracking-wide"
            >
              {e.texto}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}