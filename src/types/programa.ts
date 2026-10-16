export interface Programa {
  id: string;
  nombre: string;
  subtitulo: string;
  imagen: string;
  caracteristicas: string[];
  /** Aclaración opcional que se muestra al final de la tarjeta */
  aclaracion?: string;
}