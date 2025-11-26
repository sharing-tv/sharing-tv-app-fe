// // src/app/pages/admin-live-nativo/admin-live-nativo.page.ts

// import { Component } from '@angular/core';
// import { LiveNativoService } from 'src/app/services/live-nativo.service';

// @Component({
//   selector: 'app-admin-live-nativo',
//   templateUrl: './admin-live-nativo.page.html',
//   styleUrls: ['./admin-live-nativo.page.scss'],
// })
// export class AdminLiveNativoPage {
//   private pc?: RTCPeerConnection;
//   private stream?: MediaStream;
//   isStreaming = false;

//   constructor(private liveService: LiveNativoService) {}

//   /** 🎬 Avvia la trasmissione (WHIP → backend → OME) */
//   async startBroadcast() {
//     try {
//       this.isStreaming = true;

//       // 1️⃣ acquisisci video + audio
//       this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

//       const preview = document.getElementById('preview') as HTMLVideoElement;
//       if (preview) preview.srcObject = this.stream;

//       // 2️⃣ crea peer connection
//       this.pc = new RTCPeerConnection();
//       this.stream.getTracks().forEach(track => this.pc!.addTrack(track, this.stream!));

//       // 3️⃣ crea offerta e inviala al backend (WHIP proxy)
//       const offer = await this.pc.createOffer();
//       await this.pc.setLocalDescription(offer);

//       const answerSDP = await this.liveService.postWhipSDP(offer.sdp!).toPromise();
//       if (!answerSDP) throw new Error('Nessuna risposta dal server WHIP');

//       await this.pc.setRemoteDescription({ type: 'answer', sdp: answerSDP as string });

//       console.log('✅ Diretta avviata con successo');
//     } catch (err) {
//       console.error('❌ Errore durante l’avvio:', err);
//       this.isStreaming = false;
//     }
//   }

//   /** ⏹ Ferma trasmissione */
//   async stopBroadcast() {
//     try {
//       this.stream?.getTracks().forEach(track => track.stop());
//       this.stream = undefined;

//       this.pc?.close();
//       this.pc = undefined;

//       this.isStreaming = false;
//       console.log('🛑 Trasmissione terminata');
//     } catch (err) {
//       console.error('❌ Errore nello stop:', err);
//     }
//   }

//   /** 📤 Upload diretto su Hetzner */
//   async onSelectFile(event: any) {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       // 1️⃣ ottieni URL firmato dal backend
//       const presign = await this.liveService.presignUpload(file.name, file.type).toPromise();
//       if (!presign?.url || !presign?.key || !presign?.cdnUrl) {
//         throw new Error('Errore nel presign URL');
//       }

//       // 2️⃣ invia il file direttamente a Hetzner S3
//       await fetch(presign.url, {
//         method: 'PUT',
//         headers: { 'Content-Type': file.type },
//         body: file,
//       });

//       // 3️⃣ conferma il caricamento al backend (salva su Mongo)
//       await this.liveService
//         .confirmUpload({
//           title: file.name,
//           key: presign.key,
//           fileUrl: presign.cdnUrl,
//           duration: 0,
//         })
//         .toPromise();

//       alert('✅ VOD caricato su Hetzner CDN!');
//     } catch (err) {
//       console.error('❌ Errore upload VOD:', err);
//       alert('Errore durante upload');
//     }
//   }
// }

