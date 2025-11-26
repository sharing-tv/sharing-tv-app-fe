import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharingIaPage } from './sharing-ia.page';

const routes: Routes = [
  {
    path: '',
    component: SharingIaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharingIaPageRoutingModule {}
