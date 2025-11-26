import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScaricaComponent } from './scarica.component';

const routes: Routes = [
  { path: '', component: ScaricaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScaricaRoutingModule {}

