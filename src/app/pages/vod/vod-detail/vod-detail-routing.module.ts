
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VodDetailComponent } from './vod-detail.component';

const routes: Routes = [
  {
    path: '',
    component: VodDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VodDetailRoutingModule {}

