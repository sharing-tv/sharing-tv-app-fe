
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  
  constructor(private auth: AuthService) {}

  get isLogged(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }
}

