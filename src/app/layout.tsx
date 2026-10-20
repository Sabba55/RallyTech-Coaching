import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rallytech.example.com"), // cambiar por el dominio real
  title: "RallyTech Coaching | by Samir Assaf",
  description:
    "Coaching, análisis de telemetría y entrenamiento de rally. Encontrá el tiempo, desarrollá al piloto.",
  openGraph: {
    title: "RallyTech Coaching | by Samir Assaf",
    description:
      "Coaching, análisis de telemetría y entrenamiento de rally.",
    images: ["/images/og.jpg"],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={exo.className}>
        {/* Sin JavaScript no hay animación: el contenido se muestra completo */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}