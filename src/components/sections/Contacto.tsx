"use client";

import { useActionState } from "react";
import programas from "@/data/programas.json";
import { enviarContacto } from "@/actions/enviar-contacto";
import type { RespuestaContacto } from "@/types/contacto";

const campo =
  "w-full rounded-[10px] border border-gris-700 bg-gris-900 px-4 py-3 text-sm font-medium not-italic text-gris-100 placeholder:text-gris-400 outline-none transition focus:border-verde";
const etiqueta = "mb-2 block text-xs uppercase tracking-widest text-gris-400";

export default function Contacto() {
  const [estado, accion, enviando] = useActionState<RespuestaContacto | null, FormData>(
    enviarContacto,
    null
  );

  return (
    <section id="contacto" className="scroll-mt-20 border-t border-gris-700 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16">
        {/* Columna izquierda: mensaje */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold uppercase leading-tight md:text-5xl">
            ¿Dónde estás
            <span className="block text-verde">perdiendo tiempo?</span>
          </h2>
          <p className="mt-5 max-w-md font-medium text-gris-100">
            Contanos sobre tu auto, categoría, experiencia y objetivo. Te
            ayudamos a encontrar el próximo paso.
          </p>
        </div>

        {/* Columna derecha: formulario */}
        <form action={accion} className="space-y-5">
          {estado?.ok && (
            <p
              role="status"
              className="rounded-[10px] border border-verde bg-verde/10 px-4 py-3 text-sm text-verde"
            >
              ¡Consulta enviada! Te respondemos a la brevedad.
            </p>
          )}
          {estado && !estado.ok && (
            <p
              role="alert"
              className="rounded-[10px] border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {estado.error}
            </p>
          )}

            {/* Fila 1: nombre | correo electrónico */}
            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label htmlFor="nombre" className={etiqueta}>
                Nombre *
                </label>
                <input
                id="nombre"
                name="nombre"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Tu nombre"
                defaultValue={estado?.valores?.nombre}
                className={campo}
                />
            </div>

            <div>
                <label htmlFor="email" className={etiqueta}>
                Correo electrónico *
                </label>
                <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={150}
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                defaultValue={estado?.valores?.email}
                className={campo}
                />
            </div>
            </div>

            <div>
                <label htmlFor="programa" className={etiqueta}>
                Interesado en *
                </label>
                <select
                id="programa"
                name="programa"
                required
                defaultValue={estado?.valores?.programa ?? ""}
                className={campo}
                >
                <option value="" disabled>
                    Elegí una opción
                </option>
                {programas.map((p) => (
                    <option key={p.id} value={p.id}>
                    {p.nombre}
                    </option>
                ))}
                <option value="no-seguro">No estoy seguro</option>
                </select>
            </div>

            <div>
                <label htmlFor="mensaje" className={etiqueta}>
                ¿Qué querés mejorar?
                </label>
                <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                maxLength={2000}
                placeholder="Contanos tu auto, categoría y objetivo"
                defaultValue={estado?.valores?.mensaje}
                className={campo}
                />
            </div>

          {/* Campo trampa anti-bots: oculto para las personas */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label htmlFor="sitioWeb">No completar</label>
            <input id="sitioWeb" name="sitioWeb" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Contenedor del botón */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-verde px-8 py-3 text-sm font-bold uppercase text-negro transition duration-200 enabled:hover: enabled:hover:shadow-[0_0_18px_rgba(57,255,20,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {enviando ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Enviando…
                </>
              ) : (
                "Enviar consulta →"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}