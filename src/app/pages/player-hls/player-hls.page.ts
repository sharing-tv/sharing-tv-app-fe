
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-player-hls',
  templateUrl: './player-hls.page.html',
  styleUrls: ['./player-hls.page.scss'],
})
export class PlayerHlsPage implements OnInit, OnDestroy {

  @ViewChild('video', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  hls: Hls | null = null;
  currentClock = "--:--:--";

  ngOnInit() {
    setInterval(() => {
      const d = new Date();
      this.currentClock = d.toLocaleTimeString('it-IT', { hour12: false });
    }, 1000);
  }

  ngAfterViewInit() {
    this.initPlayer();
  }

  initPlayer() {
    const video = this.videoRef.nativeElement;
    const url = "https://www.sharingtveuropa.it/live.m3u8";

    if (Hls.isSupported()) {
      this.hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      this.hls.loadSource(url);
      this.hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari (iOS/macOS)
      video.src = url;
    }

    video.play().catch(() => {});
  }

  toggleMute() {
    this.videoRef.nativeElement.muted = !this.videoRef.nativeElement.muted;
  }

  async full() {
    await this.videoRef.nativeElement.requestFullscreen();
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
  }
}

