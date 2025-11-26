import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharingLegalitaPage } from './sharing-legalita.page';

const routes: Routes = [
  {
    path: '',
    component: SharingLegalitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharingLegalitaPageRoutingModule {}
