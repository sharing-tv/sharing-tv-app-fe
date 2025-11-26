import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.scss'],
})
export class AdminUploadComponent {
  progress = 0;
  uploadedUrl = '';

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.uploadService.uploadVideo(file).subscribe({
      next: (event: any) => {
        if (event.type === 1 && event.total) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.body) {
          this.uploadedUrl = event.body.url;
        }
      },
      error: (err) => console.error('Errore upload:', err),
    });
  }
}

