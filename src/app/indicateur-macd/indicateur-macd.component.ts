import { Component, OnInit } from '@angular/core';
import { GraphPlot } from '../graph-plot';
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
    this.graphConfig = {
      responsive: true
    };
    this.graphLayout = {
      height: 300,
      margin: {
        l: 50,
        r: 20,
        b: 50,
        t: 20,
        pad: 0
      },
      showlegend: false
    };
  }

  ngOnInit() {
    this.getMacdData();
  }

  getMacdData() {
    this.marketService.getMacdPlots()
      .subscribe((data: GraphPlot[][]) => {
        /**
         * Conversion des tableaux de points en données de graphe pour plotly.
         * On passe d'un tableau d'objets {x, y} à 2 tableaux x[], y[].
         */
        this.macdData = []; // reset des données de graphe
          data.forEach((element: GraphPlot[]) => {
            const graphData: GraphData = new GraphData();
            graphData.x = element.map(item => item.x); // extraction de tous les champs "x" dans un tableau
            graphData.y = element.map(item => item.y); // extraction de tous les champs "y" dans un tableau
            graphData.type = 'scatter';

            this.macdData.push(graphData);
          });

          // TODO à revoir
          this.macdData[0].name = 'MACD';
          this.macdData[1].name = 'Signal';
      });
  }

}
