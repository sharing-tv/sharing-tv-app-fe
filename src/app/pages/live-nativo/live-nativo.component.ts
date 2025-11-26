// // src/app/pages/live-nativo/live-nativo.component.ts
// // src/app/pages/live-nativo/live-nativo.component.ts
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { LiveNativoService, LiveResponse } from 'src/app/services/live-nativo.service';

// @Component({
//   selector: 'app-live-nativo',
//   templateUrl: './live-nativo.component.html',
//   styleUrls: ['./live-nativo.component.scss'],
// })
// export class LiveNativoComponent implements OnInit, OnDestroy {
//   private pc?: RTCPeerConnection;
//   private interval?: any;

//   isLive = false;
//   currentVideo?: string;
//   checking = false;

//   constructor(private liveService: LiveNativoService) {}

//   ngOnInit(): void {
//     this.checkStreamStatus();
//     this.interval = setInterval(() => this.checkStreamStatus(), 15000);
//   }

//   ngOnDestroy(): void {
//     this.destroyPlayer();
//     if (this.interval) clearInterval(this.interval);
//   }

//   /** 🔎 Controlla se siamo in live o VOD */
//   async checkStreamStatus() {
//     try {
//       this.checking = true;
//       const res = (await this.liveService.getCurrentStream().toPromise()) as LiveResponse;

//       if (res.type === 'live' && res.whep) {
//         this.isLive = true;
//         await this.startLivePlayer(res.whep);
//       } else if (res.type === 'vod' && res.video) {
//         this.isLive = false;
//         this.destroyPlayer();
//         this.currentVideo = res.video;
//       } else {
//         this.destroyPlayer();
//         this.currentVideo = undefined;
//       }
//     } catch (err) {
//       console.error('❌ Errore stato live/vod:', err);
//     } finally {
//       this.checking = false;
//     }
//   }

//   /** 📡 Avvia player WebRTC (WHEP) */
//   async startLivePlayer(whepUrl: string) {
//     try {
//       this.destroyPlayer();
//       const videoEl = document.getElementById('player') as HTMLVideoElement;
//       if (!videoEl) return;

//       const pc = new RTCPeerConnection();
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);

//       const res = await fetch(whepUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/sdp' },
//         body: offer.sdp,
//       });

//       const answerSdp = await res.text();
//       await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
//       pc.ontrack = (event) => (videoEl.srcObject = event.streams[0]);

//       this.pc = pc;
//       console.log('🎬 Player WebRTC attivo');
//     } catch (err) {
//       console.error('❌ Errore player live:', err);
//     }
//   }

//   destroyPlayer() {
//     try {
//       this.pc?.close();
//       this.pc = undefined;
//       const videoEl = document.getElementById('player') as HTMLVideoElement;
//       if (videoEl) videoEl.srcObject = null;
//     } catch {}
//   }
// }

