
// import {
//   Component,
//   ElementRef,
//   OnInit,
//   ViewChild,
//   OnDestroy
// } from '@angular/core';
// import { Platform } from '@ionic/angular';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { LiveService, LiveInfo } from 'src/app/services/live.service';

// import Hls from 'hls.js';
// import * as dashjs from 'dashjs';

// @Component({
//   selector: 'app-diretta',
//   templateUrl: './diretta.component.html',
//   styleUrls: ['./diretta.component.scss'],
// })
// export class DirettaComponent implements OnInit, OnDestroy {

//   @ViewChild('livePlayer', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;

//   live: LiveInfo | null = null;
//   iframeUrl?: SafeResourceUrl;
//   loading = true;
//   error: string | null = null;

//   private hls?: Hls;
//   private dashPlayer: any;

//   currentSource = '';

//   constructor(
//     private liveService: LiveService,
//     private sanitizer: DomSanitizer,
//     private platform: Platform
//   ) {}

//   ngOnInit() {
//     this.liveService.getLiveStream().subscribe({
//       next: (data) => {
//         this.live = data;
//         this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.iframe);
//         this.loading = false;

//         setTimeout(() => this.initPlayer(), 50);
//       },
//       error: (err) => {
//         console.error(err);
//         this.error = "Errore caricando la diretta.";
//         this.loading = false;
//       }
//     });
//   }

//   private initPlayer() {
//     if (!this.live || !this.videoRef) return;

//     const video = this.videoRef.nativeElement;

//     // SMART TV → DASH
//     if (this.isSmartTv()) {
//       this.useDash(video, this.live.dash);
//       return;
//     }

//     // iOS/Safari → HLS nativo
//     const canPlayNative = video.canPlayType('application/vnd.apple.mpegurl') !== '';
//     const isIOS = this.platform.is('ios') || this.platform.is('iphone') || this.platform.is('ipad');

//     if (isIOS || canPlayNative) {
//       video.src = this.live.hls;
//       video.load();
//       this.currentSource = "HLS (native)";
//       return;
//     }

//     // BROWSER DESKTOP/MOBILE → Hls.js
//     if (Hls.isSupported()) {
//       this.hls = new Hls();
//       this.hls.loadSource(this.live.hls);
//       this.hls.attachMedia(video);
//       this.currentSource = "HLS (hls.js)";
//       return;
//     }

//     // fallback
//     video.src = this.live.hls;
//     video.load();
//     this.currentSource = "HLS (fallback)";
//   }

//   private useDash(video: HTMLVideoElement, url: string) {
//     try {
//       this.dashPlayer = dashjs.MediaPlayer().create();
//       this.dashPlayer.initialize(video, url, true);
//       this.currentSource = "DASH (Smart TV)";
//     } catch (err) {
//       console.error("DASH init error:", err);
//       this.initPlayer();
//     }
//   }

//   private isSmartTv(): boolean {
//     const ua = navigator.userAgent.toLowerCase();
//     return (
//       ua.includes("smart-tv") ||
//       ua.includes("smarttv") ||
//       ua.includes("hbbtv") ||
//       ua.includes("tizen") ||
//       ua.includes("webos") ||
//       ua.includes("netcast") ||
//       ua.includes("bravia") ||
//       ua.includes("viera")
//     );
//   }

//   ngOnDestroy() {
//     if (this.hls) this.hls.destroy();
//     if (this.dashPlayer && this.dashPlayer.reset) this.dashPlayer.reset();
//   }
// }

