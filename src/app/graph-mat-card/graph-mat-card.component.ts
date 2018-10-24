import { Component, OnInit } from '@angular/core';
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
  private static grainValues = [60, 180, 300, 900, 1800, 3600, 7200, 14400, 21600, 43200, 86400, 259200, 604800];
  private static grainLabels = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '12h', '1d', '3d', '1w'];
  private static emptyBot: Bot = {
    _id: 0,
    slackUser: '',
    currencyPair: '',
    intervalle: '0',
    lastAlert: ''
  };

  grain = 2;
  tradableAssets = [];
  currentAsset = 'XETHZEUR';
  currentBot: Bot = GraphMatCardComponent.emptyBot;
  currentBotIndex = -1;
  bots: Bot[] = [];

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
    .then((data: Bot[][]) => {
      this.bots = data.map(bot => bot[1]);
    })
    .then(() => {
      this.currentBotIndex = this.bots.findIndex(bot =>
        bot.currencyPair === this.currentAsset && bot.intervalle === '60'  // TODO this.grainAdapterValue(this.grain)
      );
      this.currentBot = this.bots[this.currentBotIndex];
    });
  }

  refreshAlert() {
    console.log('rafraichissement de l\'alerte du bot ' + this.currentBot._id);
    this.botService.getLastAlert(this.currentBot._id)
    .then(data => this.currentBot.lastAlert = data);
  }

  deleteBot() {
    console.log('suppression du bot ' + this.currentBot._id);
    this.botService.deleteBot(this.currentBot._id)
    .then(() => {
      this.currentBot = GraphMatCardComponent.emptyBot;
      this.bots.splice(this.currentBotIndex, 1);
    });
  }

  selectBot(index: number) {
    console.log('sélection du bot ' + index);
    this.currentBot = this.bots[index];
    this.refreshAlert();
  }

  createBot() {
    console.log('obtention d\'un bot');
    const existingBotIndex = this.bots.findIndex(bot =>
      bot.currencyPair === this.currentAsset && parseInt(bot.intervalle, 10) === this.grainAdapterValue(this.grain));
    if (existingBotIndex === -1) {
      console.log(' =>  création');
      this.botService.putBot(this.grainAdapterValue(this.grain), this.currentAsset)
      .then(data => {
        this.bots.push(data);
        this.currentBotIndex = this.bots.length - 1;
        this.currentBot = this.bots[this.currentBotIndex];
      });
    } else {
      console.log(' => simple get');
      this.currentBotIndex = existingBotIndex;
      this.currentBot = this.bots[existingBotIndex];
    }
  }

  grainAdapterLabel(value: number | null): string {
    console.log(this.bots);
    console.log(this.currentBot);
    if (value == null || value < 0 || value > 12) {
      return GraphMatCardComponent.grainLabels[2];
    } else {
      return GraphMatCardComponent.grainLabels[Math.round(value)];
    }
  }

  grainAdapterValue(value: number | null): number {
    if (value == null || value < 0 || value > 12) {
      return GraphMatCardComponent.grainValues[2];
    } else {
      return GraphMatCardComponent.grainValues[Math.round(value)];
    }
  }
}
