import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module'; // importa il modulo unico

const routes: Routes = [
  // { path: '', component: null } // non serve più component qui
];

@NgModule({
  declarations: [], // 👈 vuoto
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RssLiveNewsModule {}

