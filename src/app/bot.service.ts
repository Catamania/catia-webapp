import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const slackBotUrl = environment.slackBotUrl;
@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpClient) {  }

  getAllBots(): Promise<any> {
    return this.http
      .get<any>(
        `${slackBotUrl}/bots`,
        httpOptions
      )
      .toPromise();
  }

  putBot(grain: number, asset: string): Promise<any> {
    return this.http
      .put<any>(
        `${slackBotUrl}/bots`,
        {slackUser: 'CatIA', currencyPair: asset, intervalle: grain},
        httpOptions
      )
      .toPromise();
  }

  getLastAlert(botId: number): Promise<any> {
    return this.http
      .get<any>(
        `${slackBotUrl}/bots/alert/${botId}`,
        httpOptions
      )
      .toPromise();
  }

  deleteBot(botId: number): Promise<any> {
    return this.http
      .delete<any>(
        `${slackBotUrl}/bots/${botId}`,
        httpOptions
      )
      .toPromise();
  }
}
