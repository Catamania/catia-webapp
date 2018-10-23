import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';
import { MarketService } from '../market.service';


const PAIR_ETH_EUR = 'XETHZEUR';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['../material-dashboard/material-dashboard.component.css', './wallet.component.css']
})
export class WalletComponent implements OnInit {
  ethAmount: string;
  eurAmount: string;

  constructor(
    private web3Service: Web3Service,
    private marketService: MarketService
    ) {
  }

  /**
   * Initialisation du composant
   */
  ngOnInit() {
    Promise.all([
      // 1. Récupération de l'adresse du wallet
      this.web3Service.getWalletAddress()
      // 2. Récupération du solde du wallet
      .then(address => this.web3Service.getEthAmount(address))
      // 3. Stockage du montant
      .then(amount => {
        this.ethAmount = amount.toString();
        return amount;
      }),
      this.marketService.getTicker(PAIR_ETH_EUR)
    ])
    .then(result => {
      const amount = result[0];
      const ticker = result[1];

      // calcul de la conversion ETH->EUR
      this.eurAmount = (parseFloat(amount) * parseFloat(ticker[PAIR_ETH_EUR]['c'][0])).toString();

    })
    .catch(error => {
      console.error(error);
    });

  }

}
