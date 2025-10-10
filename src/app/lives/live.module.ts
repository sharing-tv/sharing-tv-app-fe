// src/app/lives/live.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { LiveComponent } from './live/live.component';
import { LiveRoutingModule } from './live-routing.module';

@NgModule({
  declarations: [LiveComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule,
    LiveRoutingModule
  ],
  exports: [LiveComponent] // 👈 per riutilizzarlo altrove
})
export class LiveModule {}

