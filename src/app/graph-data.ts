import {IOHLC} from './graph-plot';
/**
 * Classe pour modéliser les coordonnées x,y d'un point sur un graphe
 */
export class GraphData {
  x: Date[];
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

  constructor(ohlcArray: IOHLC[]) {
    this.x = ohlcArray.map( element => new Date(element.date * 1000));
    this.open = ohlcArray.map( element => element.open);
    this.high = ohlcArray.map(element => element.high);
    this.low = ohlcArray.map(element => element.low);
    this.close = ohlcArray.map(element => element.close);
    this.type = 'candlestick';
  }

}
