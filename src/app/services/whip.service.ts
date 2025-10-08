// // src/app/services/whip.service.ts
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class WhipService {
//   private pc?: RTCPeerConnection;
//   private resourceUrl?: string;

//   async startPlayback(videoEl: HTMLVideoElement, whipProxyUrl: string) {
//     // 1. Crea RTCPeerConnection
//     this.pc = new RTCPeerConnection();

//     // 2. Ascolta le tracce remote e collega al <video>
//     this.pc.ontrack = (event) => {
//       console.log('🎥 Track ricevuta:', event.streams);
//       videoEl.srcObject = event.streams[0];
//       videoEl.play().catch((err) => console.error('❌ Autoplay bloccato:', err));
//     };

//     // 3. Aggiungi transceiver in sola ricezione
//     this.pc.addTransceiver('video', { direction: 'recvonly' });
//     this.pc.addTransceiver('audio', { direction: 'recvonly' });

//     // 4. Crea e applica l’SDP offer
//     const offer = await this.pc.createOffer();
//     await this.pc.setLocalDescription(offer);

//     // 5. POST al backend (proxy WHIP → Castr)
//     const resp = await fetch(whipProxyUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/sdp' },
//       body: offer.sdp || '',
//     });

//     if (!resp.ok) {
//       throw new Error(`WHIP POST failed: ${resp.status} ${resp.statusText}`);
//     }

//     // 6. Ricevi e applica l’SDP answer
//     const answer = await resp.text();
//     await this.pc.setRemoteDescription({ type: 'answer', sdp: answer });

//     // 7. Salva la resource URL (serve per DELETE)
//     this.resourceUrl = resp.headers.get('Location') || undefined;
//     console.log('📌 Resource URL salvata:', this.resourceUrl);
//   }

//   async stopPlayback() {
//     if (this.resourceUrl) {
//       try {
//         await fetch(this.resourceUrl, { method: 'DELETE' });
//         console.log('🛑 Sessione WHIP terminata con DELETE');
//       } catch (err) {
//         console.warn('⚠️ Errore DELETE WHIP:', err);
//       }
//     }

//     if (this.pc) {
//       this.pc.close();
//       console.log('🧹 RTCPeerConnection chiusa');
//     }

//     this.pc = undefined;
//     this.resourceUrl = undefined;
//   }
// }

