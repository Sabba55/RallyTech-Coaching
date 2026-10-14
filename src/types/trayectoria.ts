export interface Estadistica {
  valor: string;
  etiqueta: string;
}

export interface Hito {
  titulo: string;
  detalle: string;
}

export interface Trayectoria {
  presentacion: string;
  estadisticas: Estadistica[];
  hitos: Hito[];
}