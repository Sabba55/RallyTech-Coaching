"use client";

import imagenes from "@/data/programas.json";
import type { Programa } from "@/types/programa";
import { useIdioma } from "@/i18n/IdiomaProvider";
import TarjetaPrograma from "@/components/ui/TarjetaPrograma";
import { retraso } from "@/utils/reveal";

const imagenesPorId: Record<string, string> = imagenes;

export default function Programas() {
  const { t } = useIdioma();
  const textos = t.programas;

  // Une los textos del idioma con la imagen de cada programa
  const programas: Programa[] = textos.lista.map((p) => ({
    ...p,
    imagen: imagenesPorId[p.id],
  }));

  return (
    <section id="servicios" className="scroll-mt-20 border-t border-gris-700 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="reveal text-2xl font-extrabold uppercase md:text-3xl">
          {textos.titulo1} <span className="text-verde">{textos.titulo2}</span>
        </h2>
        <p className="reveal mt-2 font-medium text-gris-400" style={retraso(80)}>
          {textos.subtitulo}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programas.map((p, i) => (
            <TarjetaPrograma
              key={p.id}
              programa={p}
              indice={i}
              masInfo={textos.masInfo}
              importante={textos.importante}
            />
          ))}
        </div>
      </div>
    </section>
  );
}