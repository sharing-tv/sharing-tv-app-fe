// src/app/pages/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,   // 👈 ora Home conosce tutti i componenti condivisi
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ]
})
export class HomeModule {}

