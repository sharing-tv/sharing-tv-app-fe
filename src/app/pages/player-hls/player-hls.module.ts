import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerHlsPageRoutingModule } from './player-hls-routing.module';

import { PlayerHlsPage } from './player-hls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerHlsPageRoutingModule
  ],
  declarations: [PlayerHlsPage]
})
export class PlayerHlsPageModule {}
