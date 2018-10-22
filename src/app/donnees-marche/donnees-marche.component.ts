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
      responsive: true
    };
    this.graphLayout = {
      height: 300,
      margin: {
        l: 30,
        r: 0,
        b: 50,
        t: 20,
        pad: 0
      },
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
    this.marketService.getOHLC()
    .then(data => {
      this.donneesMarche[0] = new GraphOHLCData(data);
    });
  }


}
