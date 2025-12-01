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
import { AuthGuard } from './guards/auth.guard';

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
  // {
  // path: 'live-nativo',
  // loadChildren: () =>
  //   import('./pages/live-nativo/live-nativo.module').then(
  //     (m) => m.LiveNativoModule
  //   ),
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

    {
    path: 'vod',
    loadChildren: () =>
      import('./pages/vod/vod.module').then(m => m.VodModule)
  },

    {
    path: 'vod-detail/:id',
    loadChildren: () =>
      import('./pages/vod/vod-detail/vod-detail.module').then(m => m.VodDetailModule)
  },
  {
    path: 'palinsesto',
    loadChildren: () =>
      import('./admin/palinsesto/palinsesto.module').then(m => m.PalinsestoModule)
  },
  {
    path: 'registrati',
    loadChildren: () => import('./pages/registrati/registrati.module').then( m => m.RegistratiPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'chi-siamo',
    loadChildren: () => import('./pages/chi-siamo/chi-siamo.module').then( m => m.ChiSiamoPageModule)
  },
  {
    path: 'cosa-facciamo',
    loadChildren: () => import('./pages/cosa-facciamo/cosa-facciamo.module').then( m => m.CosaFacciamoPageModule)
  },
  {
    path: 'comitato-scientifico',
    loadChildren: () => import('./pages/comitato-scientifico/comitato-scientifico.module').then( m => m.ComitatoScientificoPageModule)
  },
  {
    path: 'nostri-portali',
    loadChildren: () => import('./pages/nostri-portali/nostri-portali.module').then( m => m.NostriPortaliPageModule)
  },
  {
    path: 'sharing-legalita',
    loadChildren: () => import('./pages/sharing-legalita/sharing-legalita.module').then( m => m.SharingLegalitaPageModule)
  },
  {
    path: 'sharing-ia',
    loadChildren: () => import('./pages/sharing-ia/sharing-ia.module').then( m => m.SharingIaPageModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'admin/palinsesto',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/palinsesto/palinsesto.module').then(m => m.PalinsestoModule)
  }
  
  // {
  //   path: 'admin-live-nativo',
  //   loadChildren: () => import('./pages/admin-live-nativo/admin-live-nativo.module').then( m => m.AdminLiveNativoPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

