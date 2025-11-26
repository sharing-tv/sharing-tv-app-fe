import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NostriPortaliPageRoutingModule } from './nostri-portali-routing.module';

import { NostriPortaliPage } from './nostri-portali.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NostriPortaliPageRoutingModule
  ],
  declarations: [NostriPortaliPage]
})
export class NostriPortaliPageModule {}
