// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';

// export interface LiveResponse {
//   type: 'live' | 'vod' | 'idle';
//   whip?: string;
//   whep?: string;
//   video?: string;
//   message?: string;
// }

// @Injectable({ providedIn: 'root' })
// export class LiveNativoService {
//   private base = `${environment.apiBaseUrl}/api/live-nativo`;

//   constructor(private http: HttpClient) {}

//   /** Stato live/vod corrente */
//   getCurrentStream() {
//     return this.http.get<LiveResponse>(`${this.base}/current`);
//   }

//   /** Proxy backend per WHIP */
//   postWhipSDP(sdp: string) {
//     return this.http.post(`${this.base}/whip`, sdp, {
//       headers: { 'Content-Type': 'application/sdp' },
//       responseType: 'text',
//     });
//   }

//   /** Upload VOD su Hetzner */
//   presignUpload(filename: string, contentType: string) {
//     return this.http.post<{ url: string; key: string; cdnUrl: string }>(
//       `${environment.apiBaseUrl}/api/live-nativo/vod/presign`,
//       { filename, contentType }
//     );
//   }

//   confirmUpload(payload: {
//     title: string;
//     key: string;
//     fileUrl: string;
//     duration: number;
//     description?: string;
//     scheduleAt?: string;
//   }) {
//     return this.http.post(`${environment.apiBaseUrl}/api/live-nativo/vod/confirm`, payload);
//   }

//   listVod() {
//     return this.http.get<any[]>(`${environment.apiBaseUrl}/api/live-nativo/vod/list`);
//   }

//   currentVod() {
//     return this.http.get<{ type: string; video?: string }>(
//       `${environment.apiBaseUrl}/api/live-nativo/vod/current`
//     );
//   }
// }

