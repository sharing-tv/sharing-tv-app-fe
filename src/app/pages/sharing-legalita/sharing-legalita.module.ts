import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharingLegalitaPageRoutingModule } from './sharing-legalita-routing.module';

import { SharingLegalitaPage } from './sharing-legalita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharingLegalitaPageRoutingModule
  ],
  declarations: [SharingLegalitaPage]
})
export class SharingLegalitaPageModule {}
