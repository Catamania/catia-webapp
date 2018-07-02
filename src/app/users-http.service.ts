import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiHost = 'allstack.fr';
// const apiHost: string = 'localhost';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  constructor(private http: HttpClient) {}

  getNonce(walletAddress): Promise<any> {
    if (walletAddress == null) {
      console.log('erreur nonce');
    }
    return this.http
      .get<any>(
        `https://${apiHost}/slack-commands-server/users?wallet_address=${walletAddress}`,
        // `http://${apiHost}:5001/users?wallet_address=${walletAddress}`,
        httpOptions
      )
      .toPromise();
  }
}
