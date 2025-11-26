
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VodPageRoutingModule } from './vod-routing.module';
import { VodComponent } from './vod.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VodPageRoutingModule
  ],
  declarations: [VodComponent]
})
export class VodModule {}

