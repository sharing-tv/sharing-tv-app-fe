
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PalinsestoRoutingModule } from './palinsesto-routing.module';
import { PalinsestoComponent } from './palinsesto.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DragDropModule,
    PalinsestoRoutingModule,
  ],
  declarations: [PalinsestoComponent]
})
export class PalinsestoModule {}

