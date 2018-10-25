import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MarketService } from '../market.service';
import { BotService } from '../bot.service';

interface Bot {
  _id: number;
  slackUser: string;
  currencyPair: string;
  intervalle: string;
  lastAlert: string;
}


@Component({
  selector: 'app-graph-mat-card',
  templateUrl: './graph-mat-card.component.html',
  styleUrls: ['../material-dashboard/material-dashboard.component.css', './graph-mat-card.component.css']
})
export class GraphMatCardComponent implements OnInit {
  private static grainValues = [1, 5, 15, 30, 60, 240, 1440, 100800, 21600];
  private static grainLabels = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '7d', '15d'];
  private static emptyBot: Bot = {
    _id: -1,
    slackUser: '',
    currencyPair: '',
    intervalle: '0',
    lastAlert: ''
  };

  grain = 0;
  tradableAssets = [];
  currentAsset: string;
  currentBot: Bot = GraphMatCardComponent.emptyBot;
  bots = new Map<number, Bot>();

  constructor (
    private marketService: MarketService,
    private botService: BotService
    ) {}

  ngOnInit() {
    this.marketService.getTradableAssets()
    .then(data => {
      Object.keys(data).map((key) => {
        data[key].key = key;
        this.tradableAssets.push(data[key]);
      });
    });

    this.botService.getAllBots()
    .then((data: any) => {
      const res = new Map<number, Bot>();
      data.map(toClean => res.set(toClean[1]._id, toClean[1]));
      this.bots = res;
    });
  }

  refreshAlert() {
    console.log('rafraichissement de l\'alerte du bot ' + this.currentBot._id);
    this.botService.getLastAlert(this.currentBot._id)
    .then(data => this.currentBot.lastAlert = data);
  }

  deleteBot(id: number) {
    console.log('suppression du bot ' + id);
    this.botService.deleteBot(id);
    this.bots.delete(id);
    this.bots = new Map(this.bots);
    if (id === this.currentBot._id) {
      this.setCurrentBot(GraphMatCardComponent.emptyBot);
    }
  }

  private setCurrentBot(bot: Bot) {
    this.currentBot = bot;
    this.currentAsset = this.currentBot.currencyPair;
    this.grain = GraphMatCardComponent.grainValues.findIndex(val => val === parseInt(this.currentBot.intervalle, 10));
  }

  selectBot(id: number) {
    console.log('sélection du bot ' + id);
    this.setCurrentBot(this.bots.get(id));
    this.refreshAlert();
  }

  createBot() {
    console.log('obtention d\'un bot');
    let createBot: Bot = null;
    this.bots.forEach(bot => {
      if (bot.currencyPair === this.currentAsset && parseInt(bot.intervalle, 10) === this.grainAdapterValue(this.grain)) {
       createBot = bot;
    }});
    if (createBot === null) {
      console.log(' =>  création');
      this.botService.putBot(this.grainAdapterValue(this.grain), this.currentAsset)
      .then((data: Bot) => {
        console.log(data);
        this.bots.set(data._id, data);
        this.bots = new Map(this.bots);
        this.setCurrentBot(data);
      });
    } else {
      console.log(' => simple get');
      this.setCurrentBot(createBot);
    }
  }

  grainAdapterLabel(value: number | null): string {
    if (value == null || value < 0 || value >= GraphMatCardComponent.grainLabels.length) {
      return GraphMatCardComponent.grainLabels[0];
    } else {
      return GraphMatCardComponent.grainLabels[Math.round(value)];
    }
  }

  grainAdapterValue(value: number | null): number {
    if (value == null || value < 0 || value >= GraphMatCardComponent.grainValues.length) {
      return GraphMatCardComponent.grainValues[0];
    } else {
      return GraphMatCardComponent.grainValues[Math.round(value)];
    }
  }
}


@Pipe({
  name: 'iterable',
  pure: true
})
export class IterablePipe implements PipeTransform {
  transform(iterable: any, args: any[]): any {
    const result = [];
    if (iterable.entries) {
      iterable.forEach((value, key) => {
        result.push({ key, value });
      });
    } else {
      for (const key in iterable) {
        if (iterable.hasOwnProperty(key)) {
          result.push({ key, value: iterable[key] });
        }
      }
    }
    return result;
  }
}
