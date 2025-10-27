
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LiveResponse {
  type: 'live' | 'vod' | 'idle';
  whip?: string;
  whep?: string;
  video?: string;
  position?: number;
  checkedAt?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LiveNativoService {
  private apiUrl =  `${environment.apiBaseUrl}/api/live-nativo` // 🔧 aggiorna con il dominio o IP backend
//   private readonly apiUrl = `${environment.apiBaseUrl}/rss`;

  constructor(private http: HttpClient) {}

  getCurrentStream(): Observable<LiveResponse> {
    return this.http.get<LiveResponse>(`${this.apiUrl}/current`);
  }
}

