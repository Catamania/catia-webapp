import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiHost = environment.usersServiceUrl;
// const apiHost: string = 'localhost';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(private http: HttpClient) { }

  auth(claimedAddress: string, signedMssage: string): Promise<any> {
    return this.http
      .post<any>(
        `${apiHost}/slack-commands-server/auth`,
        {'claimed_address': claimedAddress, 'signed_message': signedMssage},
        httpOptions
      )
      .toPromise();
  }

}
