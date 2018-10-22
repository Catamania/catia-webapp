import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { CurrencyBalance } from '../currencyBalance';

@Component({
  selector: 'app-kraken-account',
  templateUrl: './kraken-account.component.html',
  styleUrls: ['./kraken-account.component.css']
})
export class KrakenAccountComponent implements OnInit {

  private currencies: CurrencyBalance[];

  constructor(private marketService: MarketService) {
    this.currencies = [];
   }

  ngOnInit() {
    this.marketService.getBalance()
    .then( currencies => {
      console.log(currencies);

      for (let key in currencies) {
        let balance = currencies[key];
        if (balance != '0') {
          let currency = new CurrencyBalance(key, currencies[key]);
          this.currencies.push(currency);
        }
     }


    })
    .catch(error => console.error(error));
  }

}
