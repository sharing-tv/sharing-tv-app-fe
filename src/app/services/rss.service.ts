// src/app/services/rss.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface NewsItem {
  title: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class RssService {
  private readonly apiUrl = `${environment.apiBaseUrl}/rss`;

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.apiUrl);
  }
}

