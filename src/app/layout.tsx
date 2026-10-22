import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { URL_SITIO } from "@/utils/sitio";

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  alternates: { canonical: "/" },
  title: "RallyTech Coaching",
  description:
    "Más técnica. Más control. Más rápido. Tu próximo nivel empieza acá.",
  openGraph: {
    title: "RallyTech Coaching",
    description: "Más técnica. Más control. Más rápido. Tu próximo nivel empieza acá.",
    url: "/",
    siteName: "RallyTech Coaching",
    images: [
      {
        url: "/images/og.jpg",
        width: 500,
        height: 500,
        alt: "RallyTech Coaching by Samir Assaf",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "RallyTech Coaching",
    description: "Más técnica. Más control. Más rápido. Tu próximo nivel empieza acá.",
    images: ["/images/og.jpg"],
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