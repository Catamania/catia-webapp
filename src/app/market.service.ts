import { Injectable } from '@angular/core';
import { IGraphPlot, IOHLC, MACD } from './graph-plot';
import * as kraken from 'node-kraken-api';
import { environment } from '../environments/environment';

const ethBotUrl = environment.ethBotUrl;
@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private publicAPI;
  private privateAPI = null;

  constructor() {
    this.publicAPI = kraken();

    console.log(environment.krakenSecret);

  if (environment.krakenPrivateKey !== null && environment.krakenSecret !== null) {
    const key: string = environment.krakenPrivateKey;
    const secret: string = environment.krakenSecret;
    this.privateAPI = kraken({
      key: key,
      secret: secret
    });
  }
}

  getTime(): Promise<any> {
    return this.publicAPI.call('Time');
  }

  getMacd(): Promise<MACD> {
    const url = `${ethBotUrl}/MACD?grain=5`;
    return fetch(url)
    .then (response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Exception : ' + response.status + '\n' + response.statusText);
      }
    })
    .then (json => {
      const macd: IGraphPlot[] = json[0]['values'];
      const signal: IGraphPlot[] = json[1]['values'];

      return new MACD(macd, signal);
    })
    .catch(error => {
      console.error(error);
      return null;
    });
  }

  getBalance(): Promise<any> {
    if (!this.privateAPI || this.privateAPI == null)  {
      return Promise.reject('Api Privée non instanciée');
    } else {
      return this.privateAPI.call('Balance');
    }
  }

  getTradeBalance(): Promise<any> {
    if (!this.privateAPI || this.privateAPI == null)  {
      return Promise.reject('Api Privée non instanciée');
    } else {
      return this.privateAPI.call('TradeBalance', {asset: 'ZEUR'});
    }
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


