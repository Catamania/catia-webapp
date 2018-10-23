import { Component, OnInit } from '@angular/core';
import { IGraphPlot, MACD } from '../graph-plot';
import { GraphData } from '../graph-data';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-indicateur-macd',
  templateUrl: './indicateur-macd.component.html',
  styleUrls: ['./indicateur-macd.component.css']
})
export class IndicateurMacdComponent implements OnInit {
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

  ngOnInit() {
    this.marketService.getMacd()
    .then( macd => this.refreshMACDData(macd));
  }

  refreshMACDData(macd: MACD) {
    this.macdData.push(new GraphData('MACD', macd.macd));
    this.macdData.push(new GraphData('signal', macd.signal));
  }

}
