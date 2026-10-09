import Image from "next/image";

export default function Portada() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center">
      <Image
        src="/images/portada/portada.png"
        alt="Auto de rally en acción"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-negro via-negro/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-16">
        <h1 className="text-5xl uppercase leading-[0.95] md:text-6xl lg:text-7xl">
          <span className="block font-extrabold">Encontrá</span>
          <span className="block font-extrabold text-verde">el tiempo.</span>
          <span className="block font-normal">Desarrollá</span>
          <span className="block font-normal">al piloto.</span>
        </h1>

        <p className="mt-6 text-sm uppercase tracking-widest text-gris-400">
          Performance · Técnica · Telemetría · Coaching
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="bg-verde px-6 py-3 text-sm font-bold uppercase text-negro transition hover:brightness-110 hover: hover:shadow-[0_0_18px_rgba(57,255,20,0.6)] hover:brightness-110"
          >
            Quiero mejorar →
          </a>
          <a
            href="#metodos"
            className="border border-gris-100 px-6 py-3 text-sm font-bold uppercase transition hover:border-verde hover:text-verde"
          >
            Ver el método
          </a>
        </div>
      </div>
    </section>
  );
}