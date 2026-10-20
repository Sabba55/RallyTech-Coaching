import CountUp from "@/components/ui/CountUp";
import { retraso } from "@/utils/reveal";

export default function QueEsRallytech() {
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
            Somos Rallytech Coaching
          </p>
        </div>

        {/* Contenido */}
        <div className="mt-5 grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
          {/* Izquierda: frase principal */}
          <p
            className="reveal text-3xl font-extrabold leading-tight md:text-[44px]"
            style={retraso(100)}
          >
            Creemos que todo piloto tiene un{" "}
            <span className="text-verde">potencial</span> por descubrir y un{" "}
            <span className="text-verde">sueño</span> por alcanzar.
          </p>

          {/* Derecha: desarrollo + dato */}
          <div className="reveal space-y-6" style={retraso(200)}>
            <p className="font-medium leading-relaxed text-gris-100">
              <span className="text-verde">-</span> En Rallytech transformamos esa pasión en evolución, combinando
              experiencia, técnica y entrenamiento personalizado para llevar
              cada piloto a su mejor versión.
            </p>

            <div className="flex items-center gap-5 border-y border-gris-700 py-5">
              <span className="text-6xl font-extrabold leading-none text-verde">
                <CountUp valor="30+" />
              </span>
              <p className="text-sm font-medium leading-snug text-gris-100">
                pilotos ya confiaron en nosotros, entre ellos varios campeones.
              </p>
            </div>

            <p className="font-medium leading-relaxed text-gris-100">
              <span className="text-verde">-</span> Hoy queremos invitarte a vos a ser parte de esta experiencia,
              superar tus límites y descubrir hasta dónde podés llegar.
            </p>
          </div>
        </div>

        {/* Cierre con llamado a la acción */}
        <div className="reveal mt-14 flex flex-col gap-6 rounded-[10px] border border-gris-700 bg-gris-900 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-2xl font-extrabold uppercase leading-tight md:text-2xl">
              Más técnica. Más control.{" "}
              <span className="text-verde">Más rápido.</span>
            </p>
            <p className="mt-2 font-medium text-gris-100">
              Tu próximo nivel empieza acá.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}