import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiHost = environment.usersServiceUrl;
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
        `${apiHost}/slack-commands-server/users?wallet_address=${walletAddress}`,
        httpOptions
      )
      .toPromise();
  }
}
