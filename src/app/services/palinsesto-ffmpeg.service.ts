
// src/app/services/palinsesto-ffmpeg.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FfmpegScheduleItem, FfmpegVodItem, OnAirResponse } from '../types/palinsesto-ffmpeg';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PalinsestoFFmpegService {

    private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getVideos(): Observable<FfmpegVodItem[]> {
    return this.http.get<FfmpegVodItem[]>(
      `${this.baseUrl}/ffmpeg/videos`
    );
  }

  getSchedule(): Observable<FfmpegScheduleItem[]> {
    return this.http.get<FfmpegScheduleItem[]>(
      `${this.baseUrl}/ffmpeg/schedule`
    );
  }

  saveSchedule(items: FfmpegScheduleItem[]): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/ffmpeg/schedule`,
      { items }
    );
  }

  // ✅ NUOVO METODO
  getCurrentOnAir(): Observable<OnAirResponse> {
    return this.http.get<OnAirResponse>(
      `${this.baseUrl}/ffmpeg/on-air`
    );
  }


}

