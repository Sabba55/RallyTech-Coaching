import type { ReactNode } from "react";

const redes: { nombre: string; href: string; icono: ReactNode }[] = [
  {
    nombre: "Instagram",
    href: "https://www.instagram.com/samirassafrally/",
    icono: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3" />
        <path d="M16.5 7.5v.01" />
      </>
    ),
  },
  {
    nombre: "YouTube",
    href: "https://www.youtube.com/@samirassafrally",
    icono: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
  {
    nombre: "Facebook",
    href: "https://www.facebook.com/SamirAssafRally",
    icono: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    nombre: "TikTok",
    href: "https://www.tiktok.com/@samirassafrally",
    icono: (
      <>
        <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 4c.4 2.4 2 4 4.5 4.2" />
      </>
    ),
  },
];

const claseRed =
  "flex h-11 w-11 items-center justify-center rounded-[10px] border border-gris-400 text-gris-400 transition duration-200 hover:border-verde hover:text-verde";

type Props = {
  className?: string;
  /** Reemplaza el link de una red por nombre, ej: { Instagram: "https://..." } */
  hrefs?: Partial<Record<string, string>>;
};

export default function Redes({ className = "", hrefs = {} }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {redes.map((r) => (
        <a
          key={r.nombre}
          href={hrefs[r.nombre] ?? r.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={r.nombre}
          className={claseRed}
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
  );
}