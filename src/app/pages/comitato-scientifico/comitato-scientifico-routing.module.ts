import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComitatoScientificoPage } from './comitato-scientifico.page';

const routes: Routes = [
  {
    path: '',
    component: ComitatoScientificoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComitatoScientificoPageRoutingModule {}
