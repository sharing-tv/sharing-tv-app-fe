
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { LivePlayerHlsComponent } from './live-player-hls/live-player-hls.component';
import { LivePlayerDashComponent } from './live-player-dash/live-player-dash.component';

@NgModule({
  declarations: [
    LivePlayerHlsComponent,
    LivePlayerDashComponent,
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
  ],
})
export class LiveModule {}

