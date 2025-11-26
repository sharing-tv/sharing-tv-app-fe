import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaricaRoutingModule } from './scarica-routing.module';
import { ScaricaComponent } from './scarica.component';

@NgModule({
  declarations: [ScaricaComponent],
  imports: [CommonModule, ScaricaRoutingModule]
})
export class ScaricaModule {}
