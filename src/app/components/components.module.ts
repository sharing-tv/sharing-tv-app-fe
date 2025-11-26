
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LiveVodPreviewComponent } from './live-vod-preview/live-vod-preview.component';

@NgModule({
  declarations: [
    LiveVodPreviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LiveVodPreviewComponent
  ]
})
export class ComponentsModule {}

