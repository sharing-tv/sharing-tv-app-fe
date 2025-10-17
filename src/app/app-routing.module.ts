// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// importa i tuoi componenti
import { CanaleNewsComponent } from './components/canale-news/canale-news.component';
import { CanaleShowComponent } from './components/canale-show/canale-show.component';
import { CanaleArtsComponent } from './components/canale-arts/canale-arts.component';
import { CanaleEarthComponent } from './components/canale-earth/canale-earth.component';
import { CanaleEconomyComponent } from './components/canale-economy/canale-economy.component';
import { CanaleTechComponent } from './components/canale-tech/canale-tech.component';
import { CanaleLifeComponent } from './components/canale-life/canale-life.component';
import { CanaleHealthComponent } from './components/canale-health/canale-health.component';
import { LiveCanaliVmixComponent } from './pages/live-canali-vmix/live-canali-vmix.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: 'live',
  //   loadChildren: () =>
  //     import('./lives/live.module').then(m => m.LiveModule)
  // },
  {
  path: 'rss-live-news',
  loadChildren: () =>
    import('./pages/rss-live-news/rss-live-news.module').then(m => m.RssLiveNewsModule)
  },
  // 👇 rotte specifiche per i canali
  { path: 'canale/news', component: CanaleNewsComponent },
  { path: 'canale/show', component: CanaleShowComponent },
  { path: 'canale/arts', component: CanaleArtsComponent },
  { path: 'canale/earth', component: CanaleEarthComponent },
  { path: 'canale/economy', component: CanaleEconomyComponent },
  { path: 'canale/tech', component: CanaleTechComponent },
  { path: 'canale/life', component: CanaleLifeComponent },
  { path: 'canale/health', component: CanaleHealthComponent },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
    {
    path: 'live-canali-vmix',
    loadChildren: () =>
      import('./pages/live-canali-vmix/live-canali-vmix.module').then(
        (m) => m.LiveCanaliVmixModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

