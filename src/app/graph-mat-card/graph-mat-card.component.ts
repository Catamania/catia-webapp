import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-mat-card',
  templateUrl: './graph-mat-card.component.html',
  styleUrls: ['./graph-mat-card.component.css']
})
export class GraphMatCardComponent implements OnInit {
  showParams: boolean;
  grain: number;  // unités ?
  dateDebut: Date;
  dateFin: Date;
  monnaies: string[2];
  exchange: string;

  constructor() {
    this.showParams = false;
  }

  ngOnInit() {
  }
}
