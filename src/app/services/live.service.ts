// src/app/services/live.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LiveStatus {
  streamUrl: string;
  online: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  private readonly apiUrl = `${environment.apiBaseUrl}/live`;

  constructor(private http: HttpClient) {}

  getLiveStatus(): Observable<LiveStatus> {
    return this.http.get<LiveStatus>(this.apiUrl);
  }
}

