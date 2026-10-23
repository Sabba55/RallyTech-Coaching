// Año actual para el pie de página.
// Se guarda en caché para que Next lo trate como un valor estable.
export default async function Anio() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}