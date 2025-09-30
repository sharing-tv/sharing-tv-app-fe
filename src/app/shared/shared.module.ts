import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// ✅ Componenti condivisi
import { RssLiveNewsComponent } from '../pages/rss-live-news/rss-live-news.component';
import { CanaleNewsComponent } from '../components/canale-news/canale-news.component';
import { CanaleShowComponent } from '../components/canale-show/canale-show.component';
import { CanaleArtsComponent } from '../components/canale-arts/canale-arts.component';
import { CanaleEarthComponent } from '../components/canale-earth/canale-earth.component';
import { CanaleEconomyComponent } from '../components/canale-economy/canale-economy.component';
import { CanaleTechComponent } from '../components/canale-tech/canale-tech.component';
import { CanaleLifeComponent } from '../components/canale-life/canale-life.component';
import { CanaleHealthComponent } from '../components/canale-health/canale-health.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { CanaliComponent } from '../components/canali/canali.component';
import { LiveComponent } from '../lives/live/live.component';
import { RouterModule } from '@angular/router';
import { ComingSoonComponent } from '../pages/coming-soon/coming-soon.component';
import { BackgroundComponent } from '../components/background/background.component';

@NgModule({
  declarations: [
    RssLiveNewsComponent,
    CanaleNewsComponent,
    CanaleShowComponent,
    CanaleArtsComponent,
    CanaleEarthComponent,
    CanaleEconomyComponent,
    CanaleTechComponent,
    CanaleLifeComponent,
    CanaleHealthComponent,
    FooterComponent,
    CanaliComponent,
    ComingSoonComponent,
    BackgroundComponent
    // LiveComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    RssLiveNewsComponent,
    CanaleNewsComponent,
    CanaleShowComponent,
    CanaleArtsComponent,
    CanaleEarthComponent,
    CanaleEconomyComponent,
    CanaleTechComponent,
    CanaleLifeComponent,
    CanaleHealthComponent,
    FooterComponent,
    CanaliComponent,
    ComingSoonComponent,
    BackgroundComponent
    // LiveComponent
  ]
})
export class SharedModule {}

