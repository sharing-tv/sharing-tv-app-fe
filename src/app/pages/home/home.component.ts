import { Component } from '@angular/core';
import { Channel } from 'src/app/components/canali/canali.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  topChannels: Channel[] = [
    { name: 'News', route: '/canale/news', logo: 'assets/loghi/logoblu.png', cssClass: 'news' },
    { name: 'Show', route: '/canale/show', logo: 'assets/loghi/logoblu.png', cssClass: 'show' },
    { name: 'Arts', route: '/canale/arts', logo: 'assets/loghi/logoblu.png', cssClass: 'arts' },
    { name: 'Earth', route: '/canale/earth', logo: 'assets/loghi/logoblu.png', cssClass: 'earth' }
  ];

  bottomChannels: Channel[] = [
    { name: 'Economy', route: '/canale/economy', logo: 'assets/loghi/logoblu.png', cssClass: 'economy' },
    { name: 'Tech', route: '/canale/tech', logo: 'assets/loghi/logoblu.png', cssClass: 'tech' },
    { name: 'Life', route: '/canale/life', logo: 'assets/loghi/logoblu.png', cssClass: 'life' },
    { name: 'Health', route: '/canale/health', logo: 'assets/loghi/logoblu.png', cssClass: 'health' }
  ];

  // 🔗 Array unico per mostrare tutti gli 8 canali in 2×4
  get allChannels(): Channel[] {
    return [...this.topChannels, ...this.bottomChannels];
  }
}

