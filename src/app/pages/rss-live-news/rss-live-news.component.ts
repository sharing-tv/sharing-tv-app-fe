// src/app/pages/rss-live-news/rss-live-news.component.ts
import { Component, OnInit } from '@angular/core';
import { RssService, NewsItem } from 'src/app/services/rss.service';

@Component({
  selector: 'app-rss-live-news',
  templateUrl: './rss-live-news.component.html',
  styleUrls: ['./rss-live-news.component.scss']
})
export class RssLiveNewsComponent implements OnInit {
  news: NewsItem[] = [];

  constructor(private rssService: RssService) {}

  ngOnInit() {
    this.rssService.getNews().subscribe({
      next: (data) => {
        this.news = data.filter(item => this.isItalian(item.title));
      },
      error: (err) => console.error('❌ Errore caricamento RSS:', err),
    });
  }

  /** Mantieni solo titoli con lettere italiane/latine standard */
  private isItalian(text: string): boolean {
    // Regex: accetta lettere base, accentate, numeri, punteggiatura comune
    return /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s.,;:'"!?()\-–—]+$/.test(text);
  }
}

