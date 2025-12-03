
// src/app/services/palinsesto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface VodListItem {
  id: string;
  title: string;
  thumbnail?: string;
  bunnyId: string;
  length?: number;
}

export interface ChannelItem {
  vod: string;           // id VodItem
  startAt: string | null;  // ISO datetime
  startTime?: string|null;
}

export interface ChannelDto {
  _id: string;
  slug: string;
  items: ChannelItem[];
  loop?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PalinsestoService {

  private readonly apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // lista VOD (riuso l’API /vod pubblica)
  getVodList(): Observable<VodListItem[]> {
    return this.http.get<VodListItem[]>(`${this.apiBase}/vod`);
  }

  // canale VOD (vod-channel-1)
  getChannel(slug: string = 'vod-channel-1'): Observable<ChannelDto> {
    return this.http.get<ChannelDto>(`${this.apiBase}/admin/channel/${slug}`);
  }

  // salva canale
  saveChannel(slug: string, items: ChannelItem[], loop: boolean): Observable<any> {
    return this.http.post(`${this.apiBase}/admin/channel/${slug}`, {
      items,
      loop
    });
  }

  syncVod() {
    return this.http.get(`${this.apiBase}/admin/vod/sync`);
  }

}

