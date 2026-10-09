import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Portada from "@/components/sections/Portada";
import Programas from "@/components/sections/Programas";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="font-bold italic">
        <Portada />
        <Programas />
      </main>

      <Footer />
    </>
  );
}