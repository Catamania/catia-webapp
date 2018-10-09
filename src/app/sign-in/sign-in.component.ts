import { Component, OnInit } from '@angular/core';
import { UsersHttpService } from '../users-http.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  jsonWebToken = 'PAS DE JWT';
  buttonTitle: string;

  constructor(
    private usersHttpService: UsersHttpService,
  ) { }

  updateButtonTitle(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.buttonTitle = 'Log Out';
    } else {
      this.buttonTitle = 'Login with Metamask';
    }
  }

  toggleLogIn(): void {
    this.usersHttpService.toggleLog()
    .then( logged => this.updateButtonTitle(logged));
  }


  ngOnInit() {
    this.updateButtonTitle(this.usersHttpService.isLoggedIn());
  }

}
