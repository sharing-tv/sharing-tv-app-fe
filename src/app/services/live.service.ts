

// src/app/services/live.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface VodChannelNowPlaying {
  id: string;
  title: string;
  bunnyId: string;
  hls: string;
  position: number;
}

export interface VodChannelNextItem {
  id: string;
  title: string;
  length: number;
  startTime?: string | null;
}

export interface VodChannelResponse {
  nowPlaying: VodChannelNowPlaying;
  next: VodChannelNextItem[];
}

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private readonly baseUrl = `${environment.apiBaseUrl}/live`;

  constructor(private http: HttpClient) {}

  // GET /api/live/vod-channel
  getVodChannel(): Observable<VodChannelResponse> {
    return this.http.get<VodChannelResponse>(
      `${this.baseUrl}/vod-channel`
    );
  }
}

