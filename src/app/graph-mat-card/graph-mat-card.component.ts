import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-graph-mat-card',
  templateUrl: './graph-mat-card.component.html',
  styleUrls: ['../material-dashboard/material-dashboard.component.css', './graph-mat-card.component.css']
})
export class GraphMatCardComponent implements OnInit {
  private static grainValues = [60, 180, 300, 900, 1800, 3600, 7200, 14400, 21600, 43200, 86400, 259200, 604800];
  private static grainLabels = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '12h', '1d', '3d', '1w'];

  grain = 2;
  tradableAssets = [];
  currentAsset = 'XETHZEUR';

  constructor (private marketService: MarketService) {}

  ngOnInit() {
    this.marketService.getTradableAssets()
    .then(data => {
      Object.keys(data).map((key) => {
        data[key].key = key;
        this.tradableAssets.push(data[key]);
      });
    });
  }

  grainAdapterLabel(value: number | null): string {
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
