
// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  get isLogged(): boolean {
    return this.auth.isLoggedIn();
  }

  closeMenu() {
    this.menuCtrl.close('start'); // chiude il menu sinistro
  }

  logout() {
    this.auth.logout();
    this.menuCtrl.close('start');
    this.router.navigateByUrl('/home');
  }
}

