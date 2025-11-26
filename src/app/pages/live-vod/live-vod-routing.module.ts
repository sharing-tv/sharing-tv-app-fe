
// src/app/pages/live-vod/live-vod-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveVodComponent } from './live-vod.component';

const routes: Routes = [
  {
    path: '',
    component: LiveVodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveVodComponentRoutingModule {}

