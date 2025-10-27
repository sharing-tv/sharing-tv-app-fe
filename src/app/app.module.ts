// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
// import { LiveService } from './services/live.service';
import { LiveNativoModule } from './pages/live-nativo/live-nativo.module';
import { LiveNativoService } from './services/live-nativo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    LiveNativoModule
  ],
  providers: [{ 
    provide: RouteReuseStrategy, useClass: IonicRouteStrategy 
  },
  // LiveService,
  LiveNativoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

