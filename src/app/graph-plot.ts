/**
 * Classe pour modéliser les coordonnées x,y d'un point sur un graphe
 */
export class GraphPlot {
  x: number;
  y: number;
}

export interface IOHLC {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjusted: number;
}
