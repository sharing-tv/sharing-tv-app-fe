
// import {
//   Component,
//   ElementRef,
//   OnDestroy,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Platform } from '@ionic/angular';
// import Hls from 'hls.js';
// import * as dashjs from 'dashjs';
// import { LiveService, LiveInfo } from 'src/app/services/live.service';
// import { environment } from 'src/environments/environment';

// @Component({
//   selector: 'app-live',
//   templateUrl: './live.component.html',
//   styleUrls: ['./live.component.scss'],
// })
// export class LiveComponent implements OnInit, OnDestroy {
//   @ViewChild('livePlayer', { static: false })
//   videoRef!: ElementRef<HTMLVideoElement>;

//   live: LiveInfo | null = null;
//   iframeUrl?: SafeResourceUrl;
//   loading = true;
//   error: string | null = null;

//   currentSource = '';
//   private hls?: Hls;
//   private dashPlayer: any;

//   constructor(
//     private liveService: LiveService,
//     private sanitizer: DomSanitizer,
//     private platform: Platform
//   ) {}

//   ngOnInit() {
//     const hlsUrl = this.liveService.getLiveHlsUrl();
//     this.initPlayer(hlsUrl);
//   }


//   private initPlayer(hlsUrl: string) {
//     const video = this.videoRef.nativeElement;

//     // iOS native HLS
//     if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       video.src = hlsUrl;
//       video.load();
//       return;
//     }

//     // Hls.js
//     if (Hls.isSupported()) {
//       this.hls = new Hls();
//       this.hls.loadSource(hlsUrl);
//       this.hls.attachMedia(video);
//       return;
//     }

//     // fallback
//     video.src = hlsUrl;
//     video.load();
//   }


//   private useDash(video: HTMLVideoElement, url: string) {
//     try {
//       this.dashPlayer = (dashjs as any).MediaPlayer().create();
//       this.dashPlayer.initialize(video, url, true);
//       this.currentSource = 'DASH (Smart TV)';
//     } catch (err) {
//       console.error('Errore inizializzando DASH:', err);
//       // Fallback su HLS se possibile
//       if (this.live?.hls) {
//         this.currentSource = '';
//         this.initPlayer();
//       }
//     }
//   }

//   private isSmartTv(): boolean {
//     const ua = navigator.userAgent.toLowerCase();
//     return (
//       ua.includes('smart-tv') ||
//       ua.includes('smarttv') ||
//       ua.includes('hbbtv') ||
//       ua.includes('tizen') ||
//       ua.includes('webos') ||
//       ua.includes('netcast') ||
//       ua.includes('bravia') ||
//       ua.includes('viera')
//     );
//   }

//   ngOnDestroy() {
//     if (this.hls) {
//       this.hls.destroy();
//     }
//     if (this.dashPlayer && typeof this.dashPlayer.reset === 'function') {
//       this.dashPlayer.reset();
//     }
//   }
// }

