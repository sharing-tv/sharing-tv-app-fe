
// src/app/pages/live-vod/live-vod.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LiveVodComponentRoutingModule } from './live-vod-routing.module';
import { LiveVodComponent } from './live-vod.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LiveVodComponentRoutingModule
  ],
  declarations: [LiveVodComponent]
})
export class LiveVodComponentModule {}

