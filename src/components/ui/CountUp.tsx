"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Texto con número al inicio, ej: "15+" (cuenta de 0 a 15 y deja el "+") */
  valor: string;
  /** Duración de la cuenta en ms */
  duracion?: number;
};

export default function CountUp({ valor, duracion = 1400 }: Props) {
  const partes = /^(\d+)(.*)$/.exec(valor);
  const destino = partes ? Number(partes[1]) : null;
  const sufijo = partes ? partes[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  // null = mostrar el valor final (render del servidor, sin JS o con movimiento reducido)
  const [actual, setActual] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || destino === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observer.disconnect();

        const inicio = performance.now();
        const paso = (ahora: number) => {
          const progreso = Math.min((ahora - inicio) / duracion, 1);
          const suave = 1 - Math.pow(1 - progreso, 3); // ease-out
          setActual(Math.round(destino * suave));
          if (progreso < 1) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [destino, duracion]);

  if (destino === null) return <>{valor}</>;

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      {/* Reserva el ancho final para que el texto no se mueva mientras cuenta */}
      <span className="invisible" aria-hidden>
        {valor}
      </span>
      <span className="absolute inset-0" aria-hidden>
        {actual ?? destino}
        {sufijo}
      </span>
      <span className="sr-only">{valor}</span>
    </span>
  );
}