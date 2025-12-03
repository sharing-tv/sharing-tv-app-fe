import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerDashPage } from './player-dash.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerDashPageRoutingModule {}
