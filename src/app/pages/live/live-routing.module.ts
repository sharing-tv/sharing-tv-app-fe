
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivePlayerHlsComponent } from './live-player-hls/live-player-hls.component';
import { LivePlayerDashComponent } from './live-player-dash/live-player-dash.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hls',
    pathMatch: 'full',
  },
  {
    path: 'hls',
    component: LivePlayerHlsComponent,
  },
  {
    path: 'dash',
    component: LivePlayerDashComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveRoutingModule {}

