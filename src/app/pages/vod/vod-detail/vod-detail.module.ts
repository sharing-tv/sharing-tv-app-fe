
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VodDetailRoutingModule } from './vod-detail-routing.module';
import { VodDetailComponent } from './vod-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VodDetailRoutingModule
  ],
  declarations: [VodDetailComponent]
})
export class VodDetailModule {}

