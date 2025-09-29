import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { LiveComponent } from './live/live.component';

@NgModule({
  declarations: [LiveComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule
  ],
  exports: [LiveComponent] // 👈 per riutilizzarlo altrove
})
export class LiveModule {}

