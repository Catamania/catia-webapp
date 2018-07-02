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
export class AuthHttpService {

  constructor(private http: HttpClient) { }

  auth(claimedAddress: string, signedMssage: string): Promise<any> {
    // return this.http
    //   .post<any>(
    //     `https://${apiHost}/slack-commands-server/auth`,
    //     // `http://${apiHost}:5001/auth`,
    //     {'claimed_address': claimedAddress, 'signed_message': signedMssage},
    //     httpOptions
    //   )
    //   .toPromise();
    return of('abcd.efgh.ijkl').toPromise();
  }

}
