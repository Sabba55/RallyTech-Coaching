import Image from "next/image";
import type { Programa } from "@/types/programa";

export default function TarjetaPrograma({ programa }: { programa: Programa }) {
  // "Rallytech Online" -> marca: "Rallytech", resto: "Online"
  const [marca, ...resto] = programa.nombre.split(" ");

  return (
    <article className="group relative flex min-h-[30rem] overflow-hidden rounded-[10px] border border-gris-700 bg-gris-900">
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
              {/* Reemplazar por el ícono SVG de public/icons cuando estén */}
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-verde" />
              {c}
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="mt-auto self-start rounded-[10px] border border-gris-100 px-5 py-2 pt-2 text-xs font-bold uppercase transition hover:border-verde hover:text-verde"
        >
          Más info →
        </a>
      </div>
    </article>
  );
}