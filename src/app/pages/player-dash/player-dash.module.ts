import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerDashPageRoutingModule } from './player-dash-routing.module';

import { PlayerDashPage } from './player-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerDashPageRoutingModule
  ],
  declarations: [PlayerDashPage]
})
export class PlayerDashPageModule {}
