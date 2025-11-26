import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharingIaPageRoutingModule } from './sharing-ia-routing.module';

import { SharingIaPage } from './sharing-ia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharingIaPageRoutingModule
  ],
  declarations: [SharingIaPage]
})
export class SharingIaPageModule {}
