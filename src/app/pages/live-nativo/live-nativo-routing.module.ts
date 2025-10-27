// src/app/pages/live-nativo/live-nativo-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveNativoComponent } from './live-nativo.component';

const routes: Routes = [
  {
    path: '',
    component: LiveNativoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveNativoRoutingModule {}

