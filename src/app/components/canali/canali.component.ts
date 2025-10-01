// src/app/components/canali/canali.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-canali',
  templateUrl: './canali.component.html',
  styleUrls: ['./canali.component.scss']
})
export class CanaliComponent {
  channels = [
    { name: 'news', label: 'News', route: '/canale/news' },
    { name: 'show', label: 'Show', route: '/canale/show' },
    { name: 'arts', label: 'Arts', route: '/canale/arts' },
    { name: 'earth', label: 'Earth', route: '/canale/earth' },
    { name: 'economy', label: 'Economy', route: '/canale/economy' },
    { name: 'tech', label: 'Tech', route: '/canale/tech' },
    { name: 'life', label: 'Life', route: '/canale/life' },
    { name: 'health', label: 'Health', route: '/canale/health' },
  ];
}

