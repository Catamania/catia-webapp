import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GraphPlot } from './graph-plot';
import { MACD_GRAPH_PLOTS } from './mock-macd-graph';

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


}


