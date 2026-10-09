import Image from "next/image";

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
        <p>© {new Date().getFullYear()} Rallytech Coaching. Todos los derechos reservados.</p>
        
        {/* Los links a redes se completan cuando el cliente los envíe */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-verde">Instagram</a>
          <a href="#" className="hover:text-verde">TikTok</a>
        </div>
      </div>
    </footer>
  );
}