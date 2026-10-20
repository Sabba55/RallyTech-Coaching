import type { CSSProperties } from "react";

/** Retraso (ms) de la animación de aparición; solo se aplica desde 768px (ver globals.css). */
export const retraso = (ms: number): CSSProperties =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;