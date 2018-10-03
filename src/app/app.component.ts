import { Component } from '@angular/core';
import { UsersHttpService } from './users-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private usersHttpService: UsersHttpService) {}

  isLoggedIn(): boolean {
    return this.usersHttpService.isLoggedIn();
  }

}
