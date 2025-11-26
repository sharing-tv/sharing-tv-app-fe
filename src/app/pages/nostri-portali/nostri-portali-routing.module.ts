import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NostriPortaliPage } from './nostri-portali.page';

const routes: Routes = [
  {
    path: '',
    component: NostriPortaliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NostriPortaliPageRoutingModule {}
