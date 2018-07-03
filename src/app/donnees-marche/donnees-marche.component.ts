import { Component, OnInit } from '@angular/core';
import { GraphPlot } from '../graph-plot';
import { GraphOHLCData } from '../graph-data';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-donnees-marche',
  templateUrl: './donnees-marche.component.html',
  styleUrls: ['./donnees-marche.component.css']
})
export class DonneesMarcheComponent implements OnInit {
  donneesMarche: GraphOHLCData[] = [];
  graphLayout: any;

  constructor(private marketService: MarketService) {
    this.graphLayout = {
      autosize: true,
      dragmode: 'zoom',
      showlegend: false,
      xaxis: {
        autorange: true,
        rangeslider: {
         visible: false
        },
        type: 'date'
      },
      yaxis: {
        autorange: true,
        type: 'linear'
      }
    };
  }

  ngOnInit() {
    this.getMarketOHLCData();
  }

  getMarketOHLCData() {
    this.marketService.getMarketOHLCPlots()
      .subscribe((data: any[][]) => { // TODO typing
        const tmp: GraphOHLCData = new GraphOHLCData();
        tmp.x = data.map(item => new Date(item[0] as number * 1000));
        tmp.open = data.map(item => item[1]);
        tmp.high = data.map(item => item[2]);
        tmp.low = data.map(item => item[3]);
        tmp.close = data.map(item => item[4]);
        tmp.type = 'ohlc';
        this.donneesMarche.push(tmp);
        console.log(this.donneesMarche);
      });
  }
}
