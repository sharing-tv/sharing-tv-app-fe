import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosaFacciamoPage } from './cosa-facciamo.page';

const routes: Routes = [
  {
    path: '',
    component: CosaFacciamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosaFacciamoPageRoutingModule {}
