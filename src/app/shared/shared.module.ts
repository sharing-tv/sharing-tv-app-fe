// src/app/shared/shared.module.ts
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
import { ChannelLogoComponent } from '../components/channel-logo/channel-logo.component';
import { TvLogoComponent } from '../components/tv-logo/tv-logo.component';
import { SloganComponent } from '../components/slogan/slogan.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    BackgroundComponent,
    ChannelLogoComponent,
    TvLogoComponent,
    SloganComponent,
    LiveComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
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
    BackgroundComponent,
    ChannelLogoComponent,
    TvLogoComponent,
    SloganComponent,
    LiveComponent
  ]
})
export class SharedModule {}

