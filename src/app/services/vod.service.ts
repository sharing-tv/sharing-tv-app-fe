
// src/app/services/vod.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface VodListItem {
  id: string;
  title: string;
  thumbnail?: string;
  bunnyId: string;
}

export interface VodDetail {
  id: string;
  title: string;
  description: string;
  hls: string;
  dash: string;
}

@Injectable({
  providedIn: 'root'
})
export class VodService {
  // Usa sempre la base API dall'environment
  private readonly baseUrl = `${environment.apiBaseUrl}/vod`;

  constructor(private http: HttpClient) {}

  // Lista VOD (per la pagina /vod)
  getVodList(): Observable<VodListItem[]> {
    return this.http.get<VodListItem[]>(this.baseUrl);
  }

  // Dettaglio VOD (per /vod-detail/:id)
  getVodById(id: string): Observable<VodDetail> {
    return this.http.get<VodDetail>(`${this.baseUrl}/${id}`);
  }
}

