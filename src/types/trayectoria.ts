export interface Estadistica {
  valor: string;
  etiqueta: string;
}

export interface Hito {
  titulo: string;
  detalle: string;
}

export interface Trayectoria {
  estadisticas: Estadistica[];
  hitos: Hito[];
}