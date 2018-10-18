import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  ethAmount: string;
  eurAmount: number;

  constructor(
    private web3Service: Web3Service,
    private marketService: MarketService
    ) {
  }

  /**
   * Initialisation du composant
   */
  ngOnInit() {
    // 1. Récupération de l'adresse du wallet
    this.web3Service.getWalletAddress()
    // 2. Récupération du solde du wallet
    .then(address => this.web3Service.getEthAmount(address))
    // 3. Stockage du montant
    .then(amount => {
      this.ethAmount = amount.toString();
    })
    // [TODO] 4. Récupération du montant correspondant en EUR
    .catch(error => {
      console.error(error);
    });

    this.marketService.getTime()
    .then(time => console.log(time));
  }

}
