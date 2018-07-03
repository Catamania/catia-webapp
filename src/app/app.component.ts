import { Component } from '@angular/core';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private web3service: Web3Service) {}

  isLoggedIn(): boolean {
    return this.web3service.isLoggedIn();
  }

}
