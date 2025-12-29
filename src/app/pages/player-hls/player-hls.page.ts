
// src/app/pages/player-hls/player-hls.page.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-hls',
  templateUrl: './player-hls.page.html',
  styleUrls: ['./player-hls.page.scss'],
})
export class PlayerHlsPage implements OnInit, OnDestroy {

  @ViewChild('video', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  hls: Hls | null = null;
  currentClock = '--:--:--';

  private readonly hlsUrl =
    `${environment.streamBaseUrl}/live-stream/hls.m3u8`;

  ngOnInit() {
    setInterval(() => {
      this.currentClock = new Date().toLocaleTimeString('it-IT', { hour12: false });
    }, 1000);
  }

  ngAfterViewInit() {
    this.initPlayer();
  }

  initPlayer() {
    const video = this.videoRef.nativeElement;

    if (Hls.isSupported()) {
      this.hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        },
      });

      this.hls.loadSource(this.hlsUrl);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.ERROR, (_evt, data) => {
        console.error('HLS error', data);
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari / iOS
      video.src = this.hlsUrl;
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
    this.hls?.destroy();
    this.hls = null;
  }
}

