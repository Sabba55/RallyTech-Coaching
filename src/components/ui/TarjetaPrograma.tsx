import Image from "next/image";
import type { Programa } from "@/types/programa";
import { retraso } from "@/utils/reveal";

export default function TarjetaPrograma({
  programa,
  indice = 0,
  masInfo,
  importante,
}: {
  programa: Programa;
  /** Posición en la grilla, para escalonar la animación */
  indice?: number;
  /** Texto del botón de la tarjeta, según el idioma */
  masInfo: string;
  /** Texto oculto que antecede a la aclaración (solo para lectores de pantalla) */
  importante: string;
}) {
  // "Rallytech Online" -> marca: "Rallytech", resto: "Online"
  const [marca, ...resto] = programa.nombre.split(" ");

  return (
    <article
      style={retraso(indice * 120)}
      className="reveal group relative flex min-h-[30rem] overflow-hidden rounded-[10px] border border-gris-700 bg-gris-900">
      <Image
        src={programa.imagen}
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-negro via-negro/80 to-negro/20" />

      <div className="relative flex w-full flex-col p-6">
        <h3 className="text-2xl font-extrabold uppercase leading-none">
          {marca}
          <span className="block text-verde">{resto.join(" ")}</span>
        </h3>
        <p className="mt-3 text-xs uppercase tracking-widest text-gris-400">
          {programa.subtitulo}
        </p>

        <ul className="mt-6 space-y-2.5 text-sm font-medium">
          {programa.caracteristicas.map((c) => (
            <li key={c} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-verde" />
              {c}
            </li>
          ))}
        </ul>

        {programa.aclaracion && (
          <p className="flex items-start gap-2 pt-4 text-xs font-medium leading-relaxed text-gris-100">
            <svg
              viewBox="0 0 25 25"
              className="mt-px h-4 w-4 shrink-0 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="sr-only">{importante}</span>
            {programa.aclaracion}
          </p>
        )}

        <a
          href="#contacto"
          className="mt-auto self-start rounded-[10px] border border-gris-100 px-5 py-2 pt-2 text-xs font-bold uppercase transition hover:border-verde hover:text-verde"
        >
          {masInfo}
        </a>
      </div>
    </article>
  );
}