import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistratiPage } from './registrati.page';

const routes: Routes = [
  {
    path: '',
    component: RegistratiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistratiPageRoutingModule {}
