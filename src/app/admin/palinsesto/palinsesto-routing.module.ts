
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PalinsestoComponent } from './palinsesto.component';

const routes: Routes = [
  {
    path: '',
    component: PalinsestoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalinsestoRoutingModule {}

