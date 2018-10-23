import { Component, OnInit } from '@angular/core';
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
  graphConfig: any;

  constructor(private marketService: MarketService) {
    this.graphConfig = {
      responsive: true,
      staticPlot: true
    };
    this.graphLayout = {
      height: 290,
      margin: {
        l: 40,
        r: 0,
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

  ngOnInit() {
    this.marketService.getOHLC()
    .then(data => {
      this.donneesMarche[0] = new GraphOHLCData(data);
    });
  }


}
