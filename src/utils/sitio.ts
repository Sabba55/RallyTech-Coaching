// URL pública del sitio: la usan el metadata, el sitemap y el robots
// Para usar el dominio propio, definir NEXT_PUBLIC_SITE_URL en el hosting
export const URL_SITIO = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rallytechcoaching.netlify.app"
).replace(/\/+$/, "");