"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Redes from "@/components/common/Redes";
import { useIdioma } from "@/i18n/IdiomaProvider";

// El año llega ya armado desde la página (ver Anio.tsx)
export default function Footer({ anio }: { anio: ReactNode }) {
  const { t } = useIdioma();
  const textos = t.pie;
  const navegacion = t.navegacion;

  const enlaces = [
    { href: "#inicio", texto: navegacion.inicio },
    { href: "#que-es", texto: navegacion.nosotros },
    { href: "#servicios", texto: navegacion.servicios },
    { href: "#metodos", texto: navegacion.metodos },
    { href: "#quien-soy", texto: navegacion.quienSoy },
    { href: "#contacto", texto: navegacion.contacto },
  ];

  return (
    <footer className="border-t border-gris-700 bg-gris-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 text-center sm:text-left md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Marca */}
        <div>
          <a href="#inicio" aria-label={navegacion.irAlInicio}>
            <Image
              src="/images/logo/logo-rallytech.png"
              alt="Rallytech Coaching by Samir Assaf"
              width={400}
              height={100}
              priority
              className="mx-auto h-12 w-auto sm:mx-0"
            />
          </a>
          <p className="mx-auto mt-4 max-w-xs text-sm font-medium text-gris-400 sm:mx-0">
            {textos.lema1}{" "}
            <span className="text-verde">{textos.lema2}</span>
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label={textos.ariaPie}>
          <h3 className="text-xs uppercase tracking-widest text-gris-400">
            {textos.navegacion}
          </h3>
          <ul className="mt-4 space-y-2 text-sm uppercase">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="transition duration-200 hover:text-verde"
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Redes */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-gris-400">
            {textos.seguinos}
          </h3>
          <Redes
            className="mt-4 justify-center sm:justify-start"
            hrefs={{ Instagram: "https://www.instagram.com/rallytech_coaching/" }}
          />
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gris-700">
        <p className="mx-auto max-w-6xl px-5 py-5 text-center text-xs text-gris-400 md:text-center">
          {textos.desarrolladoPor} {anio} {textos.derechos}
        </p>
      </div>
    </footer>
  );
}