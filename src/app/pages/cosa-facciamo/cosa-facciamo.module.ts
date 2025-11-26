import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosaFacciamoPageRoutingModule } from './cosa-facciamo-routing.module';

import { CosaFacciamoPage } from './cosa-facciamo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosaFacciamoPageRoutingModule
  ],
  declarations: [CosaFacciamoPage]
})
export class CosaFacciamoPageModule {}
