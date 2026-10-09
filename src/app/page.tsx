import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Portada from "@/components/sections/Portada";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Portada />
      </main>
      <Footer />
    </>
  );
}