"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import CountUp from "@/components/ui/CountUp";
import { retraso } from "@/utils/reveal";
import type { Hito } from "@/types/trayectoria";
import { useIdioma } from "@/i18n/IdiomaProvider";

// Botón de red con borde sólido (border = 1px, border-2 = 2px)
const claseRed =
  "flex h-11 w-11 items-center justify-center rounded-[10px] border-1 border-gris-200 text-gris-400 transition duration-200 hover:border-verde hover:text-verde";

const redes: { nombre: string; href: string; icono: ReactNode }[] = [
  {
    nombre: "Instagram",
    href: "https://www.instagram.com/samirassafrally/",
    icono: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3" />
        <path d="M16.5 7.5v.01" />
      </>
    ),
  },
  {
    nombre: "YouTube",
    href: "https://www.youtube.com/@samirassafrally",
    icono: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
  {
    nombre: "Facebook",
    href: "https://www.facebook.com/SamirAssafRally",
    icono: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    nombre: "TikTok",
    href: "https://www.tiktok.com/@samirassafrally",
    icono: (
      <>
        <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 4c.4 2.4 2 4 4.5 4.2" />
      </>
    ),
  },
];

function ListaHitos({ titulo, items }: { titulo: string; items: Hito[] }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-gris-400">
        {titulo}
      </h3>
      <ul className="mt-4 grid gap-5">
        {items.map((h) => (
          <li key={h.titulo} className="border-l-2 border-verde pl-4">
            <p className="text-sm font-extrabold uppercase">{h.titulo}</p>
            <p className="mt-1 text-xs font-medium text-gris-400">
              {h.detalle}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SobreMi() {
  const { t } = useIdioma();
  const textos = t.sobreMi;
  const trayectoria = t.trayectoria;

  return (
    <section
      id="quien-soy"
      className="scroll-mt-20 border-t border-gris-700 bg-gris-900 py-10"
    >
      
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[320px_1fr] md:gap-16">
        {/* Div izquierdo: 2 filas (foto + redes) */}
        <div className="reveal mx-auto flex w-full max-w-xs flex-col gap-5">
          {/* Fila 1: foto */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px] border border-gris-700 bg-gris-900">
            <Image
              src="/images/sobre-mi/samir.png"
              alt={textos.altFoto}
              fill
              sizes="320px"
              className="object-cover object-top grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-negro/70 via-transparent to-transparent" />
          </div>

          {/* Fila 2: redes */}
          <div className="flex items-center justify-center gap-4">
            {redes.map((r) => (
              <a
                key={r.nombre}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.nombre}
                className={claseRed}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {r.icono}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Div derecho: contenido */}
        <div>
          <h2 className="reveal text-center text-3xl font-extrabold uppercase md:text-left md:text-4xl">
            {textos.titulo1} <span className="text-verde">{textos.titulo2}</span>
          </h2>

          <p
            className="reveal mx-auto mt-4 max-w-xl text-center font-medium leading-relaxed text-gris-100 md:mx-0 md:text-left"
            style={retraso(100)}
          >
            {trayectoria.presentacion}
          </p>

          {/* Estadísticas */}
          <div
            className="reveal mt-8 flex flex-wrap justify-center gap-x-10 gap-y-6 md:justify-start"
            style={retraso(200)}
          >
            {trayectoria.estadisticas.map((e) => (
              <div key={e.etiqueta} className="text-center md:text-left">
                <p className="text-3xl font-extrabold uppercase text-verde">
                  <CountUp valor={e.valor} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gris-400">
                  {e.etiqueta}
                </p>
              </div>
            ))}
          </div>

          {/* Logros y experiencia */}
          <div className="reveal mt-10 grid gap-8 sm:grid-cols-2" style={retraso(300)}>
            <ListaHitos titulo={textos.logros} items={trayectoria.logros} />
            <ListaHitos
              titulo={textos.experiencia}
              items={trayectoria.experiencia}
            />
          </div>
        </div>
      </div>
    </section>
  );
}