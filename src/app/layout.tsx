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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rallytechcoaching.netlify.app"
  ),
  title: "RallyTech Coaching | by Samir Assaf",
  description:
    "Coaching, análisis de telemetría y entrenamiento de rally. Encontrá el tiempo, desarrollá al piloto.",
  openGraph: {
    title: "RallyTech Coaching | by Samir Assaf",
    description: "Coaching, análisis de telemetría y entrenamiento de rally.",
    url: "/",
    siteName: "RallyTech Coaching",
    images: [
      {
        url: "/icon.png",
        width: 524,
        height: 524,
        alt: "RallyTech Coaching by Samir Assaf",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "RallyTech Coaching | by Samir Assaf",
    description: "Coaching, análisis de telemetría y entrenamiento de rally.",
    images: ["/icon.png"],
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