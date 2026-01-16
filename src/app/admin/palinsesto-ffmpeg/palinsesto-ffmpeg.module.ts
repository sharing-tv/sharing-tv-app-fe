
// src/app/admin/palinsesto-ffmpeg/palinsesto-ffmpeg.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PalinsestoFfmpegComponent } from './palinsesto-ffmpeg.component';
import { PalinsestoFfmpegRoutingModule } from './palinsesto-ffmpeg-routing.module';

@NgModule({
  declarations: [PalinsestoFfmpegComponent],
  imports: [
    CommonModule,
    IonicModule,
    PalinsestoFfmpegRoutingModule
  ]
})
export class PalinsestoFfmpegModule {}

