
// src/app/pages/live-vod/live-vod.component.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import Hls from 'hls.js';
import {
  LiveService,
  VodChannelNextItem,
  VodChannelNowPlaying,
  VodChannelResponse
} from 'src/app/services/live.service';

@Component({
  selector: 'app-live-vod',
  templateUrl: './live-vod.component.html',
  styleUrls: ['./live-vod.component.scss'],
})
export class LiveVodComponent implements OnInit, OnDestroy {

  @ViewChild('videoPlayer', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  isLoading = true;
  error: string | null = null;

  nowPlaying: VodChannelNowPlaying | null = null;
  nextItems: VodChannelNextItem[] = [];
  currentSource = '';

  private hls?: Hls;
  private monitorTimer?: any;

  constructor(
    private liveService: LiveService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.loadChannel(false);
  }

  /**
   * Carica il canale dal backend
   */
  private loadChannel(auto = false) {
    this.isLoading = !auto;
    this.error = null;

    this.liveService.getVodChannel().subscribe({
      next: (data: VodChannelResponse) => {
        // ← se stesso video → non aggiornare e non rifare l'HLS
        if (auto && this.nowPlaying?.id === data.nowPlaying?.id) return;

        this.nowPlaying = data.nowPlaying;
        this.nextItems = data.next;
        this.isLoading = false;

        setTimeout(() => this.initPlayer(), 0);
      },
      error: (err) => {
        console.error('Errore caricando canale VOD:', err);
        this.error = 'Impossibile caricare il canale VOD.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Inizializza il player
   */
  private initPlayer() {
    if (!this.nowPlaying || !this.videoRef) {
      this.error = 'Nessun contenuto in onda.';
      return;
    }

    const video = this.videoRef.nativeElement;
    const hlsUrl = this.nowPlaying.hls;
    const startPos = this.nowPlaying.position || 0;

    this.destroyPlayer();

    const isIOS =
      this.platform.is('ios') ||
      this.platform.is('iphone') ||
      this.platform.is('ipad');

    const canPlayNativeHls =
      video.canPlayType('application/vnd.apple.mpegurl') !== '';

    // iOS / Safari →hls nativo
    if (isIOS || canPlayNativeHls) {
      video.src = hlsUrl;
      video.load();
      video.currentTime = startPos;
      video.play();
      this.currentSource = 'HLS (nativo)';
      this.startMonitor();
      return;
    }

    // hls.js
    if (Hls.isSupported()) {
      this.hls = new Hls({ enableWorker: true });
      this.hls.loadSource(hlsUrl);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = startPos;
        video.play();
      });

      this.currentSource = 'HLS (hls.js)';
      this.startMonitor();
      return;
    }

    // fallback
    video.src = hlsUrl;
    video.load();
    video.currentTime = startPos;
    video.play();
    this.currentSource = 'HLS (fallback)';
    this.startMonitor();
  }

  /**
   * Monitor REAL-TIME del cambio video
   */
  private startMonitor() {
    if (this.monitorTimer) clearInterval(this.monitorTimer);

    this.monitorTimer = setInterval(() => {
      const video = this.videoRef?.nativeElement;
      if (!video || !this.nowPlaying) return;

      if (video.duration > 0 && (video.duration - video.currentTime) < 0.5) {
        this.loadChannel(true);
      }

    }, 500);
  }

  /**
   * Pull-to-refresh
   */
  doRefresh(ev: any) {
    this.destroyPlayer();
    this.loadChannel(false);
    setTimeout(() => ev.target.complete(), 400);
  }

  /**
   * Cleanup player
   */
  private destroyPlayer() {
    if (this.monitorTimer) clearInterval(this.monitorTimer);
    this.monitorTimer = undefined;

    if (this.hls) {
      this.hls.destroy();
      this.hls = undefined;
    }

    if (this.videoRef) {
      const video = this.videoRef.nativeElement;
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }

  ngOnDestroy() {
    this.destroyPlayer();
  }
}

