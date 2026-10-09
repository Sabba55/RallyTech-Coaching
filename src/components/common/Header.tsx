"use client";

import { useState } from "react";
import Image from "next/image";

const enlaces = [
  { href: "#inicio", texto: "Inicio" },
  { href: "#servicios", texto: "Servicios" },
  { href: "#metodos", texto: "Métodos" },
  { href: "#quien-soy", texto: "¿Quién soy?" },
  { href: "#contacto", texto: "Contacto", destacado: true },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gris-700 bg-negro/90 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-5 md:px-9">
        
        <a href="#inicio" aria-label="Rallytech, ir al inicio">
            <Image
                src="/images/logo/logo-rallytech.png"
                alt="Rallytech Coaching by Samir Assaf"
                width={400}
                height={100}
                priority
                className="h-10 w-auto md:h-13"
            />
        </a>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-wide md:flex">
          {enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className={
                e.destacado
                  ? "rounded-[10px] bg-verde px-5 py-2 font-bold text-negro border border-white border-2 transition duration-200 hover: hover:shadow-[0_0_18px_rgba(57,255,20,0.6)] hover:brightness-110"
                  : "transition hover:text-verde"
              }
            >
              {e.texto}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir menú"
          aria-expanded={abierto}
        >
          <span className="text-2xl">{abierto ? "✕" : "☰"}</span>
        </button>
      </div>

      {abierto && (
        <nav className="flex flex-col gap-4 border-t border-gris-700 bg-negro px-5 py-4 md:hidden">
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