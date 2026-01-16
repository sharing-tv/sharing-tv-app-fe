
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUploadComponent } from './admin-upload.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUploadRoutingModule {}

