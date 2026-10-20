import { retraso } from "@/utils/reveal";
import type { ReactNode } from "react";

function Icono({ children }: { children: ReactNode }) {
  return (
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
      {children}
    </svg>
  );
}

const pasos = [
  {
    numero: "01",
    titulo: "Analizar",
    texto: "Entender al piloto. Onboard, telemetría, notas y vehículo.",
    icono: (
      <Icono>
        <path d="M6 20V11M12 20V5M18 20V14" />
      </Icono>
    ),
  },
  {
    numero: "02",
    titulo: "Detectar",
    texto: "Encontrar dónde se pierde tiempo. Priorizar lo importante.",
    icono: (
      <Icono>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </Icono>
    ),
  },
  {
    numero: "03",
    titulo: "Entrenar",
    texto: "Trabajar con ejercicios específicos y correcciones aplicadas.",
    icono: (
      <Icono>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="8" strokeWidth="4" strokeDasharray="3 3.2" />
      </Icono>
    ),
  },
  {
    numero: "04",
    titulo: "Medir",
    texto: "Comparar datos. Ver la evolución real.",
    icono: (
      <Icono>
        <path d="M3 19h18M4 15l5-5 4 3 7-8M16 5h4v4" />
      </Icono>
    ),
  },
  {
    numero: "05",
    titulo: "Competir",
    texto: "Aplicar lo aprendido en la carrera. Resultados.",
    icono: (
      <Icono>
        <path d="M5 21V4M5 4h13l-2.5 4L18 12H5" fill="currentColor" />
      </Icono>
    ),
  },
];

export default function Metodo() {
  return (
    <section id="metodos" className="scroll-mt-20 border-t border-gris-700 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="reveal">
            <h2 className="text-3xl font-extrabold uppercase md:text-4xl">
              El método <span className="text-verde">Rallytech</span>
            </h2>
            <p className="mt-2 font-medium text-gris-400">
              De los datos a los resultados.
            </p>
          </div>
        </div>

        <ol className="mt-8 grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {pasos.map((p, i) => (
            // Contenedor padre del método: 2 divs apilados
            <li
              key={p.numero}
              style={retraso(i * 100)}
              className="reveal relative flex flex-col gap-4"
            >
              {/* Div 1: 2 columnas */}
              <div className="flex items-center justify-center gap-6">
                {/* Columna 1: número y, debajo, la línea verde */}
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold leading-none text-gris-400/50 lg:text-5xl">
                    {p.numero}
                  </span>
                  <div className="mt-3 h-0.5 w-full bg-verde" />
                </div>

                {/* Columna 2: 2 filas */}
                <div className="flex flex-col items-center">
                  {/* Fila 1: ícono */}
                  <div>{p.icono}</div>
                  {/* Fila 2: título */}
                  <div>
                    <h3 className="mt-1 text-base font-extrabold uppercase tracking-wide">
                      {p.titulo}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Div 2: solo el texto */}
              <div>
                <p className="text-center text-[15px] font-medium leading-relaxed text-gris-100">
                  {p.texto}
                </p>
              </div>

              {i < pasos.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-6 top-5 hidden text-xl font-normal text-gris-400 lg:block"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}