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

  constructor(private marketService: MarketService) {

    this.graphLayout = {
      autosize: true
    };
  }

  ngOnInit() {
    this.getMacdData();
  }

  getMacdData() {
    this.marketService.getMacdPlots()
      .subscribe((data: GraphPlot[][]) => {
        this.macdData = [];
          data.forEach((element: GraphPlot[]) => {
            const graphData: GraphData = new GraphData();
            graphData.x = element.map(item => item.x);
            graphData.y = element.map(item => item.y);
            graphData.type = 'scatter';

            this.macdData.push(graphData);
          });
      });
  }

}
