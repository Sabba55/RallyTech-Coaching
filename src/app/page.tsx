import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// Componentes
import Portada from "@/components/sections/Portada";
import Programas from "@/components/sections/Programas";
import Metodo from "@/components/sections/Metodo";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="font-bold italic">
        <Portada />
        <Programas />
        <Metodo />
      </main>

      <Footer />
    </>
  );
}