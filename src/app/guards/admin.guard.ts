
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private readonly allowedEmail = 'info@fondazionegea.it';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    // 1️⃣ Utente non loggato → torna al login
    if (!this.auth.isLoggedIn()) {
      return this.router.parseUrl('/login');
    }

    // 2️⃣ Controllo email
    const email = this.auth.getEmail();
    console.log('Email utente:', email);

    if (email !== this.allowedEmail) {
      return this.router.parseUrl('/not-authorized');
    }

    return true;
  }
}

