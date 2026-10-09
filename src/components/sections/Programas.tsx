import programasData from "@/data/programas.json";
import type { Programa } from "@/types/programa";
import TarjetaPrograma from "@/components/ui/TarjetaPrograma";

const programas = programasData as Programa[];

export default function Programas() {
  return (
    <section id="servicios" className="scroll-mt-20 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-extrabold uppercase md:text-4xl">
          Nuestros <span className="text-verde">programas</span>
        </h2>
        <p className="mt-2 font-medium text-gris-400">
          Soluciones para cada etapa de tu desarrollo como piloto.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programas.map((p) => (
            <TarjetaPrograma key={p.id} programa={p} />
          ))}
        </div>
      </div>
    </section>
  );
}