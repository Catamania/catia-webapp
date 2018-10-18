import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GraphPlot, GraphOHLCPlot } from './graph-plot';
import { MACD_GRAPH_PLOTS } from './mock-macd-graph';
import { MARKET_GRAPH_PLOTS } from './mock-market-graph';
import * as kraken from 'node-kraken-api';


@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private publicAPI;


  constructor() {
    this.publicAPI = kraken();

  }

  /**
   * Renvoie des listes de points pour l'affichage du graphe MACD
   */
  getMacdPlots(): Observable<GraphPlot[][]> {
    return of(MACD_GRAPH_PLOTS);
  }

  getMarketOHLCPlots(): Observable<any[][]> {
    return of(MARKET_GRAPH_PLOTS);
  }

  getTime(): Promise<any> {
    return this.publicAPI.call('Time');
  }

  /**
   *
   * @param pair
   */
  getTicker(pair: string): Promise<any> {
    return this.publicAPI.call('Ticker', {'pair': pair});
  }

  getTradableAssets(): Promise<any> {
    return this.publicAPI.call('AssetPairs');
  }

}


