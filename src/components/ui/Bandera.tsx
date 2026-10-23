"use client";

import { useId } from "react";
import type { Idioma } from "@/i18n/config";

/**
 * Bandera del idioma, dibujada en SVG (los emojis de bandera no se ven en Windows).
 * es -> Argentina | en -> Reino Unido
 */
export default function Bandera({
  idioma,
  className = "h-4 w-6",
}: {
  idioma: Idioma;
  className?: string;
}) {
  // Ids únicos por instancia: el selector se dibuja dos veces (escritorio y móvil)
  const id = useId().replace(/:/g, "");

  if (idioma === "es") {
    return (
      <svg viewBox="0 0 24 16" className={className} aria-hidden>
        <rect width="24" height="16" fill="#74ACDF" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <circle cx="12" cy="8" r="1.6" fill="#F6B40E" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <clipPath id={`${id}-a`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}-b`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}-a)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${id}-b)`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}