import Image from "next/image";
import trayectoriaData from "@/data/trayectoria.json";
import type { Trayectoria } from "@/types/trayectoria";

const trayectoria = trayectoriaData as Trayectoria;

export default function SobreMi() {
  return (
    <section id="quien-soy" className="scroll-mt-20 border-t border-gris-700 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-16">
        {/* Foto */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[10px] bg-gris-900">
          <Image
            src="/images/sobre-mi/samir.png"
            alt="Samir Assaf, fundador de Rallytech"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-negro/70 via-transparent to-transparent" />
        </div>

        {/* Contenido */}
        <div>
          <h2 className="text-3xl font-extrabold uppercase md:text-4xl">
            ¿Quién <span className="text-verde">soy?</span>
          </h2>

          <p className="mt-4 max-w-xl font-medium leading-relaxed text-gris-100">
            {trayectoria.presentacion}
          </p>

          {/* Estadísticas */}
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
            {trayectoria.estadisticas.map((e) => (
              <div key={e.etiqueta}>
                <p className="text-3xl font-extrabold uppercase text-verde">
                  {e.valor}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gris-400">
                  {e.etiqueta}
                </p>
              </div>
            ))}
          </div>

          {/* Hitos */}
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {trayectoria.hitos.map((h) => (
              <li key={h.titulo} className="border-l-2 border-verde pl-4">
                <p className="text-sm font-extrabold uppercase">{h.titulo}</p>
                <p className="mt-1 text-xs font-medium text-gris-400">
                  {h.detalle}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}