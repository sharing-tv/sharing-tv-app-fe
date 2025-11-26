
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistratiPageRoutingModule } from './registrati-routing.module';

import { RegistratiPage } from './registrati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistratiPageRoutingModule
  ],
  declarations: [RegistratiPage]
})
export class RegistratiPageModule {}

