// // src/app/services/upload.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class UploadService {
//   private apiUrl = 'https://sharing-tv-app-be-1081841606305.europe-west1.run.app/api/upload'; // aggiorna con il tuo dominio backend

//   constructor(private http: HttpClient) {}

//   uploadVideo(file: File): Observable<HttpEvent<any>> {
//     const formData = new FormData();
//     formData.append('file', file);

//     const req = new HttpRequest('POST', this.apiUrl, formData, {
//       reportProgress: true,
//       responseType: 'json',
//     });

//     return this.http.request(req);
//   }
// }

