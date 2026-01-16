
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminUploadService {

  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  uploadVideo(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('video', file);

    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/admin/upload/upload-video`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}

