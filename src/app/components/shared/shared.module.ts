// src/app/components/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanaleNewsComponent } from '../canale-news/canale-news.component';
import { CanaleShowComponent } from '../canale-show/canale-show.component';
import { CanaleArtsComponent } from '../canale-arts/canale-arts.component';
import { CanaleEarthComponent } from '../canale-earth/canale-earth.component';
import { CanaleEconomyComponent } from '../canale-economy/canale-economy.component';
import { CanaleTechComponent } from '../canale-tech/canale-tech.component';
import { CanaleLifeComponent } from '../canale-life/canale-life.component';
import { CanaleHealthComponent } from '../canale-health/canale-health.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CanaleNewsComponent,
    CanaleShowComponent,
    CanaleArtsComponent,
    CanaleEarthComponent,
    CanaleEconomyComponent,
    CanaleTechComponent,
    CanaleLifeComponent,
    CanaleHealthComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CanaleNewsComponent,
    CanaleShowComponent,
    CanaleArtsComponent,
    CanaleEarthComponent,
    CanaleEconomyComponent,
    CanaleTechComponent,
    CanaleLifeComponent,
    CanaleHealthComponent
  ]
})
export class SharedModule { }

