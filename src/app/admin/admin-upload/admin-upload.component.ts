
import { Component } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { AdminUploadService } from 'src/app/services/admin-upload.service';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.scss'],
})
export class AdminUploadComponent {

  selectedFile: File | null = null;
  progress = 0;
  uploading = false;
  error: string | null = null;
  success: string | null = null;
  statusText = '';

  constructor(private uploadService: AdminUploadService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];

    // ✅ validazioni base
    if (!file.type.startsWith('video/')) {
      this.error = 'Il file selezionato non è un video';
      return;
    }

    this.selectedFile = file;
    this.error = null;
    this.success = null;
  }

upload() {
  if (!this.selectedFile) return;

  this.uploading = true;
  this.progress = 0;
  this.statusText = 'Caricamento in corso...';
  this.error = null;
  this.success = null;

  this.uploadService.uploadVideo(this.selectedFile).subscribe({
    next: event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.progress = Math.round((event.loaded / event.total) * 100);
        this.statusText = `Upload ${this.progress}%`;
      }

      if (event.type === HttpEventType.Response) {
        this.uploading = false;
        this.statusText = '';
        this.success = `Upload completato: ${event.body.filename} (${event.body.duration}s)`;
        this.selectedFile = null;
      }
    },
    error: err => {
      this.uploading = false;
      this.statusText = '';
      this.error = err?.error?.error || 'Errore upload';
    }
  });
}

}

