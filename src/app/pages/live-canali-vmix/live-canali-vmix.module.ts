// src/app/pages/live-canali-vmix/live-canali-vmix.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { LiveCanaliVmixComponent } from './live-canali-vmix.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LiveCanaliVmixComponent
  }
];

@NgModule({
  declarations: [LiveCanaliVmixComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule, // ✅ ora riconosce tutti i componenti app-*
    RouterModule.forChild(routes)
  ]
})
export class LiveCanaliVmixModule {}

