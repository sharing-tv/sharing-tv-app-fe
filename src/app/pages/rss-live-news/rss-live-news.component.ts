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
      next: (data) => (this.news = data),
      error: (err) => console.error('❌ Errore caricamento RSS:', err),
    });
  }
}

