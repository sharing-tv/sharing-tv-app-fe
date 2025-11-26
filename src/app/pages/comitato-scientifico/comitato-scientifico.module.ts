import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComitatoScientificoPageRoutingModule } from './comitato-scientifico-routing.module';

import { ComitatoScientificoPage } from './comitato-scientifico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComitatoScientificoPageRoutingModule
  ],
  declarations: [ComitatoScientificoPage]
})
export class ComitatoScientificoPageModule {}
