"use client";

import CountUp from "@/components/ui/CountUp";
import { retraso } from "@/utils/reveal";
import { useIdioma } from "@/i18n/IdiomaProvider";

export default function QueEsRallytech() {
  const { t } = useIdioma();
  const textos = t.queEs;

  return (
    <section id="que-es" className="relative scroll-mt-20 overflow-hidden py-14">
      {/* Resplandor verde de fondo (decorativo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-verde/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        {/* Encabezado */}
        <div className="reveal flex items-center gap-3">
          <span className="hidden h-0.5 w-6 bg-verde sm:block" aria-hidden />
          <p className="text-3xl md:text-3xl font-extrabold uppercase tracking-widest text-verde">
            {textos.titulo}
          </p>
        </div>

        {/* Contenido */}
        <div className="mt-5 grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
          {/* Izquierda: frase principal */}
          <p
            className="reveal text-3xl font-extrabold leading-tight md:text-[44px]"
            style={retraso(100)}
          >
            {textos.frase.antes}{" "}
            <span className="text-verde">{textos.frase.destacado1}</span>{" "}
            {textos.frase.medio}{" "}
            <span className="text-verde">{textos.frase.destacado2}</span>{" "}
            {textos.frase.despues}
          </p>

          {/* Derecha: desarrollo + dato */}
          <div className="reveal space-y-6" style={retraso(200)}>
            <p className="font-medium leading-relaxed text-gris-100">
              <span className="text-verde">-</span> {textos.parrafo1}
            </p>

            <div className="flex items-center gap-5 border-y border-gris-700 py-5">
              <span className="text-6xl font-extrabold leading-none text-verde">
                <CountUp valor="30+" />
              </span>
              <p className="text-sm font-medium leading-snug text-gris-100">
                {textos.pilotos}
              </p>
            </div>

            <p className="font-medium leading-relaxed text-gris-100">
              <span className="text-verde">-</span> {textos.parrafo2}
            </p>
          </div>
        </div>

        {/* Cierre con llamado a la acción */}
        <div className="reveal mt-14 flex flex-col gap-6 rounded-[10px] border border-gris-700 bg-gris-900 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-2xl font-extrabold uppercase leading-tight md:text-2xl">
              {textos.lema1}{" "}
              <span className="text-verde">{textos.lema2}</span>
            </p>
            <p className="mt-2 font-medium text-gris-100">
              {textos.cierre}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}