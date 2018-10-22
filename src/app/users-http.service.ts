import { Web3Service } from './web3.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiHost = environment.usersServiceUrl;
const jwtAuthKey = 'catia_jwt';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  constructor(private http: HttpClient, public web3Service: Web3Service) { }

  /**
   * Récupération d'un nonce auprès du service distant pour pouvoir le signer
   * @param walletAddress
   */
  getNonce(walletAddress): Promise<any> {
    if (walletAddress == null) {
      console.log('erreur nonce');
    }
    return this.http
      .get<any>(
        `${apiHost}/users?wallet_address=${walletAddress}`,
        httpOptions
      )
      .toPromise();
  }

  /**
   * Envoi d'un message signé vers le service pour valider l'authentification
   * @param claimedAddress
   * @param signedMssage
   */
  auth(claimedAddress: string, signedMssage: string): Promise<any> {
    return this.http
      .post<any>(
        `${apiHost}/auth`,
        {'claimed_address': claimedAddress, 'signed_message': signedMssage},
        httpOptions
      )
      .toPromise();
  }

  /**
   * Processus d'authentification.
   * Renvoie le token d'authentification
   */
  login(): Promise<any> {
    return this.web3Service.getWalletAddress()
    .then(address => {
      return this.getNonce(address);
    })
    .then(response => {
      return this.web3Service.handleSignMessage(
        response['publicAddress'],
        response['nonce']
      );
    })
    .then(retour => {
      return this.auth(retour['publicAddress'], retour['signature']);
    })
    .then(jwt => {
      this.saveToken(jwt.token);
      return jwt.token;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  /**
   * Renvoie le token d'authentification
   */
  getToken() {
    return sessionStorage.getItem(jwtAuthKey);
  }

   /**
   * Vérifie si le client est authentifié. On cherche le token jwt, puis on vérifie sa validité
   */
  isLoggedIn(): boolean {
    if (sessionStorage.getItem(jwtAuthKey) === undefined || sessionStorage.getItem(jwtAuthKey) == null) {
      return false;
    }  else {
      // TODO - vérifier l'expiration du token
      return true;
    }
  }

  /**
   * Inverse l'état loggé ou non du client, et renvoie le nouvel état
   */
  toggleLog(): Promise<boolean> {
    if (this.isLoggedIn()) {
      this.logout();
      return Promise.resolve(false);
    } else {
      this.login()
      .then (token => {
        return Promise.resolve(true);
      });
    }
  }

  /**
   * Enregistre le token JWT fourni dans le sessionStorage
   * @param token token JWT
   */
  saveToken(token: any) {
    sessionStorage.setItem(jwtAuthKey, token);
  }

  /**
   * Supprime le token du sessionStorage
   */
  logout() {
    sessionStorage.removeItem(jwtAuthKey);
  }

}
