import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GraphPlot, GraphOHLCPlot } from './graph-plot';
import { MACD_GRAPH_PLOTS } from './mock-macd-graph';
import { MARKET_GRAPH_PLOTS } from './mock-market-graph';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor() { }

  /**
   * Renvoie des listes de points pour l'affichage du graphe MACD
   */
  getMacdPlots(): Observable<GraphPlot[][]> {
    return of(MACD_GRAPH_PLOTS);
  }

  getMarketOHLCPlots(): Observable<any[][]> {
    return of(MARKET_GRAPH_PLOTS);
  }

}


