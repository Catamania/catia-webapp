import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { CurrencyBalance } from '../currencyBalance';

@Component({
  selector: 'app-kraken-account',
  templateUrl: './kraken-account.component.html',
  styleUrls: ['../material-dashboard/material-dashboard.component.css', './kraken-account.component.css']
})
export class KrakenAccountComponent implements OnInit {
  currencies: CurrencyBalance[];
  totalBalance: string;

  constructor(private marketService: MarketService) {
    this.currencies = [];
    this.totalBalance = '?';
   }

  ngOnInit() {
    this.marketService.getBalance()
    .then( currencies => {
      for (let key in currencies) {
        let balance = currencies[key];
        if (balance != '0') {
          let currency = new CurrencyBalance(key, currencies[key]);
          this.currencies.push(currency);
        }
     }
    })
    .catch(error => console.error(error));

    this.marketService.getTradeBalance()
    .then( tradeBalance => {
      this.totalBalance = tradeBalance['e'];
    })
    .catch(error => console.error(error));
  }
}
