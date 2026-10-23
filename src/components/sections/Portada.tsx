"use client";

import { getImageProps } from "next/image";
import { useIdioma } from "@/i18n/IdiomaProvider";

export default function Portada() {
  const { t } = useIdioma();
  const textos = t.portada;

  const comun = {
    alt: textos.altFondo,
    fill: true,
    sizes: "100vw",
    className: "object-cover",
  };

  const {
    props: { srcSet: srcMovil },
  } = getImageProps({ ...comun, src: "/images/portada/portada-mobile.png" });

  const {
    props: { srcSet: srcEscritorio, ...imgProps },
  } = getImageProps({ ...comun, src: "/images/portada/portada.png", priority: true });

  return (
    <section id="inicio" className="relative flex min-h-screen items-center">
      <picture>
        <source media="(max-width: 450px)" srcSet={srcMovil} />
        <source media="(min-width: 451px)" srcSet={srcEscritorio} />
        <img {...imgProps} alt={textos.altFondo} />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-negro via-negro/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-negro to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-16">
        <h1 className="text-5xl max-[383px]:text-[44px] uppercase leading-[0.95] md:text-6xl lg:text-7xl">
          <span className="block font-extrabold">{textos.linea1}</span>
          <span className="block font-extrabold text-verde">{textos.linea2}</span>
          <span className="block font-normal">{textos.linea3}</span>
          <span className="block font-normal"> </span>
        </h1>

        <p className="mt-6 text-sm uppercase tracking-widest text-gris-400">
          {textos.etiquetas}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="bg-verde px-6 py-3 text-sm font-bold uppercase text-negro transition hover:brightness-110 hover: hover:shadow-[0_0_18px_rgba(57,255,20,0.6)] hover:brightness-110"
          >
            {textos.quieroMejorar}
          </a>
          <a
            href="#metodos"
            className="border border-gris-100 px-6 py-3 text-sm font-bold uppercase transition hover:border-verde hover:text-verde"
          >
            {textos.verMetodo}
          </a>
        </div>
      </div>
    </section>
  );
}