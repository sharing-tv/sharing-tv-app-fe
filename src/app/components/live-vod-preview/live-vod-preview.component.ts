
// src/app/components/live-vod-preview/live-vod-preview.component.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import { LiveService, VodChannelResponse } from 'src/app/services/live.service';

@Component({
  selector: 'app-live-vod-preview',
  templateUrl: './live-vod-preview.component.html',
  styleUrls: ['./live-vod-preview.component.scss'],
})
export class LiveVodPreviewComponent implements OnInit, OnDestroy {

  @ViewChild('player', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  hls?: Hls;
  nowPlaying: any = null;

  refreshTimer: any;
  monitorTimer: any;
  clockTimer: any;
  hideTimeout: any;

  controlsVisible = false;
  isFullscreen = false;

  currentTime = 0;
  duration = 0;
  progressPercent = 0;
  isMuted = false;

  currentClock = "--:--:--";

  constructor(private live: LiveService) {}

  ngOnInit() {
    this.load(false);

    // refresh API (fallback)
    this.refreshTimer = setInterval(() => this.load(true), 10000);

    // orologio
    this.clockTimer = setInterval(() => {
      this.currentClock = this.formatClock(new Date());
    }, 1000);

    document.addEventListener("fullscreenchange", () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

  // ------------------------------------------------------
  // LOAD NOW PLAYING
  // ------------------------------------------------------
  load(auto: boolean) {
    this.live.getVodChannel().subscribe({
      next: (data: VodChannelResponse) => {
        if (!data.nowPlaying) return;

        const newId = data.nowPlaying.id;

        // se refresh automatico → evita restart inutile
        if (auto && this.nowPlaying?.id === newId) return;

        this.nowPlaying = data.nowPlaying;

        setTimeout(() => this.initPlayer(), 0);
      },
      error: (err) => console.error("Errore getVodChannel:", err)
    });
  }

  // ------------------------------------------------------
  // INIT PLAYER
  // ------------------------------------------------------
  private initPlayer() {
    if (!this.nowPlaying || !this.videoRef?.nativeElement) return;

    const video = this.videoRef.nativeElement;
    const hlsUrl = this.nowPlaying.hls;

    this.destroyHls();

    // usa hls.js se possibile
    if (Hls.isSupported()) {
      this.hls = new Hls({ enableWorker: true });
      this.hls.loadSource(hlsUrl);
      this.hls.attachMedia(video);
    } else {
      video.src = hlsUrl;
      video.load();
    }

    video.onloadedmetadata = () => {
      this.duration = video.duration;
    };

    video.ontimeupdate = () => {
      this.currentTime = video.currentTime;
      this.progressPercent = (video.currentTime / video.duration) * 100;
    };

    // 🔵 evita pause automatiche
    video.onpause = () => {
      video.play().catch(() => {});
    };

    // posizione iniziale
    if (this.nowPlaying.position > 0) {
      video.currentTime = this.nowPlaying.position;
    }

    // avvia
    video.play().catch(() => {});

    // monitor tempo reale
    this.startMonitor();
  }

  // ------------------------------------------------------
  // MONITOR CAMBIO VIDEO IN REAL TIME
  // ------------------------------------------------------
  private startMonitor() {
    if (this.monitorTimer) clearInterval(this.monitorTimer);

    this.monitorTimer = setInterval(() => {
      const v = this.videoRef?.nativeElement;
      if (!v || !this.nowPlaying) return;

      // se sta finendo → cambio immediato
      if (v.duration > 0 && (v.duration - v.currentTime) <= 0.30) {
        this.load(false); // NO auto mode → reinizializza sempre
      }

    }, 300);
  }

  // ------------------------------------------------------
  // UI CONTROLS
  // ------------------------------------------------------
  showControls() {
    this.controlsVisible = true;
    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      this.controlsVisible = false;
    }, 3000);
  }

  hideControls() {
    if (this.isMobile()) return;
    this.controlsVisible = false;
  }

  toggleControls() {
    this.controlsVisible = !this.controlsVisible;

    if (this.controlsVisible) {
      if (this.hideTimeout) clearTimeout(this.hideTimeout);

      this.hideTimeout = setTimeout(() => {
        this.controlsVisible = false;
      }, 3000);
    }
  }

  toggleFullScreen(event: MouseEvent) {
    event.stopPropagation();
    const container = document.querySelector('.live-preview') as HTMLElement;

    if (!document.fullscreenElement) {
      container?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  toggleMute() {
    const video = this.videoRef.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

  setQuality(value: string) {
    if (!this.hls) return;

    if (value === 'auto') {
      this.hls.currentLevel = -1;
    } else {
      this.hls.currentLevel = Number(value);
    }
  }

  // ------------------------------------------------------
  // UTILS
  // ------------------------------------------------------
  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
  }

  formatClock(d: Date): string {
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    const s = d.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  // ------------------------------------------------------
  // DESTROY
  // ------------------------------------------------------
  ngOnDestroy() {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    if (this.monitorTimer) clearInterval(this.monitorTimer);
    if (this.clockTimer) clearInterval(this.clockTimer);
    this.destroyPlayer();
  }

  private destroyHls() {
    if (this.hls) {
      this.hls.destroy();
      this.hls = undefined;
    }
  }

  private destroyPlayer() {
    this.destroyHls();

    if (this.videoRef) {
      const v = this.videoRef.nativeElement;
      v.pause();
      v.removeAttribute('src');
      v.load();
    }
  }
}

