
// src/app/admin/palinsesto-ffmpeg/palinsesto-ffmpeg-routing.module.ts
// Modulo di routing per il componente PalinsestoFFmpeg
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PalinsestoFfmpegComponent } from './palinsesto-ffmpeg.component';

const routes: Routes = [
  {
    path: '',
    component: PalinsestoFfmpegComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalinsestoFfmpegRoutingModule {}

