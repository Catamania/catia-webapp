/**
 * Classe pour modéliser les coordonnées x,y d'un point sur un graphe
 */
export interface IGraphPlot {
  x: number;
  y: number;
}

export class MACD {
  macd: IGraphPlot[];
  signal: IGraphPlot[];

  constructor(macd: IGraphPlot[], signal: IGraphPlot[]) {
    this.macd = macd;
    this.signal = signal;
  }

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
