import Image from "next/image";
import Redes from "@/components/common/Redes";

const enlaces = [
  { href: "#inicio", texto: "Inicio" },
  { href: "#servicios", texto: "Servicios" },
  { href: "#metodos", texto: "Métodos" },
  { href: "#quien-soy", texto: "¿Quién soy?" },
  { href: "#contacto", texto: "Contacto" },
];

// Guarda el año en caché para que Next lo trate como un valor estable
async function Anio() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="border-t border-gris-700 bg-gris-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Marca */}
        <div>
          <a href="#inicio" aria-label="Rallytech, ir al inicio">
            <Image
              src="/images/logo/logo-rallytech.png"
              alt="Rallytech Coaching by Samir Assaf"
              width={400}
              height={100}
              priority
              className="h-12 w-auto"
            />
          </a>
          <p className="mt-4 max-w-xs text-sm font-medium text-gris-400">
            Más técnica. Más control.{" "}
            <span className="text-verde">Más rápido.</span>
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Pie de página">
          <h3 className="text-xs uppercase tracking-widest text-gris-400">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2 text-sm uppercase">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="transition duration-200 hover:text-verde"
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Redes */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-gris-400">
            Seguinos
          </h3>
          <Redes
            className="mt-4"
            hrefs={{ Instagram: "https://www.instagram.com/rallytech_coaching/" }}
          />
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gris-700">
        <p className="mx-auto max-w-6xl px-5 py-5 text-center text-xs text-gris-400 md:text-left">
          © <Anio /> Rallytech Coaching. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}