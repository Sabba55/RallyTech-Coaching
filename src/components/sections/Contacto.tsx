"use client";

import { useActionState, useState } from "react";
import programas from "@/data/programas.json";
import { enviarContacto } from "@/actions/enviar-contacto";
import type { RespuestaContacto } from "@/types/contacto";
import { PAISES, EXPERIENCIAS } from "@/data/opciones-contacto";

const campo =
  "w-full rounded-[10px] border border-gris-400 bg-gris-900 px-4 py-3 text-sm font-medium not-italic text-gris-100 placeholder:text-gris-400 outline-none transition focus:border-verde";
const etiqueta = "mb-2 block text-xs uppercase tracking-widest text-gris-100";

export default function Contacto() {
  const [estado, accion, enviando] = useActionState<RespuestaContacto | null, FormData>(
    enviarContacto,
    null
  );

  // Reiniciar: remonta el formulario y oculta el mensaje y los valores del último envío
  const [claveForm, setClaveForm] = useState(0);
  const [estadoOculto, setEstadoOculto] = useState<RespuestaContacto | null>(null);
  const estadoVisible = estado === estadoOculto ? null : estado;

  function reiniciar() {
    setEstadoOculto(estado);
    setClaveForm((k) => k + 1);
  }

  return (
    <section id="contacto" className="relative scroll-mt-20 overflow-hidden py-14">
      {/* Divisor superior con degradé verde */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-verde/60 to-transparent"
      />
      {/* Resplandor de fondo (decorativo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1 h-120 w-136 rounded-full bg-verde/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16">
        {/* Columna izquierda: mensaje */}
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-3xl font-extrabold uppercase leading-tight md:text-5xl">
            ¿Dónde estás
            <span className="block text-verde">perdiendo tiempo?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md font-medium text-gris-100 sm:mx-0">
            Contanos sobre tu auto, categoría, experiencia y objetivo. Te
            ayudamos a encontrar el próximo paso.
          </p>
        </div>

        {/* Columna derecha: formulario */}
        <form
          key={claveForm}
          action={accion}
          className="space-y-5 rounded-[10px] border border-gris-700 bg-gris-900 p-6 md:p-8"
        >
          {estadoVisible?.ok && (
            <p
              role="status"
              className="rounded-[10px] border border-verde bg-verde/10 px-4 py-3 text-sm text-verde"
            >
              ¡Consulta enviada! Te respondemos a la brevedad.
            </p>
          )}
          {estadoVisible && !estadoVisible.ok && (
            <p
              role="alert"
              className="rounded-[10px] border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {estadoVisible.error}
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
                defaultValue={estadoVisible?.valores?.nombre}
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
                defaultValue={estadoVisible?.valores?.email}
                className={campo}
                />
            </div>
            </div>

            {/* Fila 2: país | experiencia */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="pais" className={etiqueta}>
                  País *
                </label>
                <select
                  id="pais"
                  name="pais"
                  required
                  autoComplete="country-name"
                  defaultValue={estadoVisible?.valores?.pais ?? ""}
                  className={`${campo} select-rally`}
                >
                  <option value="" disabled>
                    Elegí tu país
                  </option>
                  {PAISES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="experiencia" className={etiqueta}>
                  Experiencia *
                </label>
                <select
                  id="experiencia"
                  name="experiencia"
                  required
                  defaultValue={estadoVisible?.valores?.experiencia ?? ""}
                  className={`${campo} select-rally`}
                >
                  <option value="" disabled>
                    Elegí tu nivel
                  </option>
                  {EXPERIENCIAS.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
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
                defaultValue={estadoVisible?.valores?.programa ?? ""}
                className={`${campo} select-rally`}
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
                defaultValue={estadoVisible?.valores?.mensaje}
                className={campo}
                />
            </div>

          {/* Campo trampa anti-bots: oculto para las personas */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label htmlFor="sitioWeb">No completar</label>
            <input id="sitioWeb" name="sitioWeb" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Contenedor del botón */}
          <div className="flex items-center justify-center gap-3 pt-2 sm:justify-end">
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-verde px-8 py-3 text-sm font-bold uppercase text-negro transition duration-200 enabled:hover:shadow-[0_0_18px_rgba(57,255,20,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
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
                "Enviar consulta"
              )}
            </button>

            {/* Botón de reinicio */}
            <button
              type="button"
              onClick={reiniciar}
              disabled={enviando}
              aria-label="Reiniciar formulario"
              title="Reiniciar formulario"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[10px] border-2 border-gris-400 text-gris-400 transition duration-200 enabled:hover:bg-gris-400 enabled:hover:text-negro enabled:active:bg-gris-400 enabled:active:text-negro disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 ${
                  claveForm > 0 ? "animate-[girar_0.5s_ease-in-out] motion-reduce:animate-none" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}