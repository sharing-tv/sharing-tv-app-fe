
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiBase = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {
  console.log('==============================');
  console.log('ENV LOADED:', environment);
  console.log('ENV.apiBaseUrl:', environment.apiBaseUrl);
  console.log('API BASE COMPLETA:', this.apiBase);
  console.log('==============================');
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiBase}/register`, { email, password });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBase}/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('auth_email', res.user.email);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_email');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getEmail(): string | null {
    return localStorage.getItem('auth_email');
  }

  isAdmin(): boolean {
    return this.getEmail() === 'info@fondazionegea.it';
  }

}

