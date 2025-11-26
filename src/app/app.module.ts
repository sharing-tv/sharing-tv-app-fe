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
// import { LiveNativoModule } from './pages/live-nativo/live-nativo.module';
// import { LiveNativoService } from './services/live-nativo.service';
import { AdminUploadModule } from './admin/admin-upload/admin-upload.module';
// import { DirettaModule } from './pages/diretta/diretta.module';
// import { ScaricaModule } from './admin/scarica/scarica.module';

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    // LiveNativoModule,
    AdminUploadModule,
    // DirettaModule,
    // ScaricaModule
  ],
  providers: [{ 
    provide: RouteReuseStrategy, useClass: IonicRouteStrategy 
  },
  // LiveService,
  // LiveNativoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

