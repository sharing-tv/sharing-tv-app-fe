import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerHlsPage } from './player-hls.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerHlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerHlsPageRoutingModule {}
