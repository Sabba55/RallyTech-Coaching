import Image from "next/image";

const redes = [
  {
    nombre: "Instagram",
    href: "https://www.instagram.com/rallytech_coaching/", 
    icono: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3" />
        <path d="M16.5 7.5v.01" />
      </>
    ),
  },
];

// Guarda el año en caché para que Next lo trate como un valor estable
async function Anio() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="border-t border-gris-700 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-gris-400 md:flex-row">
        <a href="#inicio" aria-label="Rallytech, ir al inicio">
          <Image
            src="/images/logo/logo-rallytech.png"
            alt="Rallytech Coaching by Samir Assaf"
            width={400}
            height={100}
            priority
            className="h-10 w-auto md:h-12"
          />
        </a>
        <p>© <Anio /> Rallytech Coaching. Todos los derechos reservados.</p>
        
        {/* Los links a redes se completan cuando el cliente los envíe */}
        <div className="flex items-center gap-4">
          {redes.map((r) => (
            <a
              key={r.nombre}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={r.nombre}
              className="text-gris-400 transition duration-200 hover:text-verde"
            >
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
                {r.icono}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}