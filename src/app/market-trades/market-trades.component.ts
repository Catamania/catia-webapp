import { Component, AfterViewInit } from '@angular/core';
import { MarketService } from '../market.service';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface Order {
  price: number;
  volume: number;
  timestamp: number;
}

export interface OrderPairView {
  ask: Order;
  bid: Order;
}

@Component({
  selector: 'app-market-trades',
  templateUrl: './market-trades.component.html',
  styleUrls: ['../material-dashboard/material-dashboard.component.css', './market-trades.component.css']
})
export class MarketTradesComponent implements AfterViewInit {
  pair = 'XETHZEUR';
  price: number;
  volume: number;
  currency1 = 'XETH';
  currency2 = 'ZEUR';
  orders = new MatTableDataSource<OrderPairView>();

  constructor(
    private marketService: MarketService
    ) {}

  ngAfterViewInit() {
    this.refreshOrderBook();
  }

  refreshOrderBook() {
    this.marketService.getOrderBook(this.pair, 4)
    .then(data => {
      const asks: Order[] = data.asks.map(order => ({
        price: order[0],
        volume: order[1],
        timestamp: order[2]
      }));
      const bids: Order[] = data.bids.map(order => ({
        price: order[0],
        volume: order[1],
        timestamp: order[2]
      }));
      const res = [];
      for (let i = 0; i < asks.length; i++) {
        res.push({ask: asks[i], bid: bids[i]});
      }
      this.orders.data = res;
    });
  }

  buy() {
    this.marketService.trade(this.pair, 'buy', this.price, this.volume)
    .then(data => console.log(data));
  }

  sell() {
    this.marketService.trade(this.pair, 'sell', this.price, this.volume)
    .then(data => console.log(data));
  }
}
