/**
 * Classe pour modéliser les coordonnées x,y d'un point sur un graphe
 */
export class GraphData {
  x: number[];
  y: number[];
  type: string;
  name: string;
}

export class GraphOHLCData {
  x: Date[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  type: string;
  xaxis: string;
  yaxis: string;
}
