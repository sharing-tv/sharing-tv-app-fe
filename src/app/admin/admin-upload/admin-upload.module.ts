
// src/app/admin/admin-upload/admin-upload.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AdminUploadComponent } from './admin-upload.component';
import { AdminUploadRoutingModule } from './admin-upload-routing.module';
import { AdminUploadService } from 'src/app/services/admin-upload.service';

@NgModule({
  declarations: [AdminUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUploadRoutingModule
  ],
  providers: [AdminUploadService]
})
export class AdminUploadModule {}

