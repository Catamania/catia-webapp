import { Component, OnInit } from '@angular/core';
import { GraphOHLCData } from '../graph-data';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-donnees-marche',
  templateUrl: './donnees-marche.component.html',
  styleUrls: ['./donnees-marche.component.css']
})
export class DonneesMarcheComponent {
  donneesMarche: GraphOHLCData[] = [];
  graphLayout: any;
  graphConfig: any;

  constructor(private marketService: MarketService) {
    this.graphConfig = {
      responsive: true,
      displayModeBar: false
    };
    this.graphLayout = {
      height: 290,
      margin: {
        l: 40,
        r: 10,
        b: 40,
        t: 0,
        pad: 0
      },
      showlegend: false,
      xaxis: {
        rangeslider: {
         visible: false
        },
        type: 'date'
      },
      yaxis: {
        type: 'linear'
      }
    };
  }

  refresh(grain: number) {
    this.marketService.getOHLC(grain)
    .then(data => {
      this.donneesMarche[0] = new GraphOHLCData(data);
    });
  }


}
