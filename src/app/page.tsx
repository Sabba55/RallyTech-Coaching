import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// Componentes
import Portada from "@/components/sections/Portada";
import Programas from "@/components/sections/Programas";
import Metodo from "@/components/sections/Metodo";
import SobreMi from "@/components/sections/SobreMi";
import Contacto from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="font-bold italic">
        <Portada />
        <Programas />
        <Metodo />
        <SobreMi />
        <Contacto />
      </main>

      <Footer />
    </>
  );
}