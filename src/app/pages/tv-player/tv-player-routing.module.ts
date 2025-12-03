import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvPlayerPage } from './tv-player.page';

const routes: Routes = [
  {
    path: '',
    component: TvPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvPlayerPageRoutingModule {}
