"use client";

import { useEffect } from "react";

/**
 * Anima la aparición de todo elemento con la clase `reveal` cuando entra en pantalla.
 * No renderiza nada: solo observa el DOM y agrega la clase `reveal-visible`
*/
export default function ScrollReveal() {
  useEffect(() => {
    const elementos = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("reveal-visible");
            observer.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}