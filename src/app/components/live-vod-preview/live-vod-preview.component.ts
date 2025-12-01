
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import { LiveService } from 'src/app/services/live.service';

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
  clockTimer: any;

  // UI STATE
  controlsVisible = false;
  isFullscreen = false;
  hideTimeout: any;

  // PLAYER STATE
  currentTime = 0;
  duration = 0;
  progressPercent = 0;
  isMuted = false;

  // ORA CORRENTE
  currentClock: string = "--:--:--";

  constructor(private live: LiveService) {}

  ngOnInit() {
    this.load();
    this.refreshTimer = setInterval(() => this.load(), 60000);

    /** ⏱ Aggiorna l'orario ogni secondo */
    this.clockTimer = setInterval(() => {
      this.currentClock = this.formatClock(new Date());
    }, 1000);

    document.addEventListener("fullscreenchange", () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

  // GET VOD INFO
  load() {
    this.live.getVodChannel().subscribe({
      next: (data) => {
        this.nowPlaying = data.nowPlaying;
        setTimeout(() => this.initPlayer(), 0);
      }
    });
  }

  // INIT PLAYER
  initPlayer() {
    const video = this.videoRef.nativeElement;

    if (Hls.isSupported()) {
      if (this.hls) this.hls.destroy();
      this.hls = new Hls({ enableWorker: true });
      this.hls.loadSource(this.nowPlaying.hls);
      this.hls.attachMedia(video);
    } else {
      video.src = this.nowPlaying.hls;
      video.load();
    }

    video.onloadedmetadata = () => {
      this.duration = video.duration;
    };

    video.ontimeupdate = () => {
      this.currentTime = video.currentTime;
      this.progressPercent = (video.currentTime / video.duration) * 100;
    };

    video.onpause = () => {
      video.play().catch(() => {});
    };

    if (this.nowPlaying.position > 0) {
      video.currentTime = this.nowPlaying.position;
    }

    video.play().catch(() => {});
  }

  ngOnDestroy() {
    if (this.hls) this.hls.destroy();
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    if (this.clockTimer) clearInterval(this.clockTimer);
  }

  /** SHOW/HIDE CONTROLS */
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

  /** FULLSCREEN TOGGLE */
  toggleFullScreen(event: MouseEvent) {
    event.stopPropagation();

    const container = document.querySelector('.live-preview') as HTMLElement;

    if (!document.fullscreenElement) {
      container?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  /** MUTE / UNMUTE */
  toggleMute() {
    const video = this.videoRef.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

  /** QUALITY SWITCH */
  setQuality(value: string) {
    if (!this.hls) return;

    if (value === 'auto') {
      this.hls.currentLevel = -1;
      return;
    }

    this.hls.currentLevel = Number(value);
  }

  /** MOBILE CHECK */
  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
  }

  /** FORMAT CURRENT CLOCK */
  formatClock(date: Date): string {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }
}

