
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvPlayerPageRoutingModule } from './tv-player-routing.module';

import { TvPlayerPage } from './tv-player.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvPlayerPageRoutingModule,
    SharedModule
  ],
  declarations: [TvPlayerPage]
})
export class TvPlayerPageModule {}

