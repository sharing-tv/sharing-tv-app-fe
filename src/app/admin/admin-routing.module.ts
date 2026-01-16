
// src/app/admin/admin-routing.module.ts
// Modulo di routing per l'area admin
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'palinsesto',
        loadChildren: () =>
          import('./palinsesto/palinsesto.module').then(m => m.PalinsestoModule)
      },
      {
        path: '',
        redirectTo: 'palinsesto',
        pathMatch: 'full'
      },
      {
        path: 'palinsesto-ffmpeg',
        loadChildren: () =>
          import('./palinsesto-ffmpeg/palinsesto-ffmpeg.module')
            .then(m => m.PalinsestoFfmpegModule)
      },
      {
        path: 'upload',
        loadChildren: () =>
          import('./admin-upload/admin-upload.module')
            .then(m => m.AdminUploadModule)
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

