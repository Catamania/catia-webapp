import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GraphPlot, IOHLC } from './graph-plot';
import { MACD_GRAPH_PLOTS } from './mock-macd-graph';
import { MARKET_GRAPH_PLOTS } from './mock-market-graph';
import * as kraken from 'node-kraken-api';

import { environment } from '../environments/environment';
import { json } from 'd3';

const ethBotUrl = environment.ethBotUrl;
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

  getOHLC(): Promise<IOHLC[]> {
    const url = `${ethBotUrl}/OHLC?grain=5`;
    return fetch(url)
    .then (response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Exception : ' + response.status + '\n' + response.statusText);
      }
    })
    .then ( (json) => {
      console.log('json');
      console.log(json);

      let data: IOHLC[];
      data = json[0]['values'];
      return data;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
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


