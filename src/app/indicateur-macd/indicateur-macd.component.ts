import { Component, OnInit } from '@angular/core';
import { IGraphPlot, MACD } from '../graph-plot';
import { GraphData } from '../graph-data';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-indicateur-macd',
  templateUrl: './indicateur-macd.component.html',
  styleUrls: ['./indicateur-macd.component.css']
})
export class IndicateurMacdComponent {
  macdData: GraphData[];
  graphLayout: any;
  graphConfig: any;

  constructor(private marketService: MarketService) {
    this.macdData = Array<GraphData>();
    this.graphConfig = {
      responsive: true,
      displayModeBar: false
    };
    this.graphLayout = {
      height: 290,
      margin: {
        l: 40,
        r: 10,
        b: 50,
        t: 10,
        pad: 0
      },
      showlegend: false
    };
  }

  refresh(grain: number) {
    this.marketService.getMacd(grain)
    .then(data => {
      const res = [];
      res.push(new GraphData('MACD', data.macd));
      res.push(new GraphData('signal', data.signal));
      this.macdData = res;
    });
  }

}
