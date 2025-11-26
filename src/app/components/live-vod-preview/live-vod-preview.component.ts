

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
  timer: any;

  constructor(private live: LiveService) {}

    cleanTitle(name: string): string {
    return name.replace(/\.[^/.]+$/, ""); 
    }


  ngOnInit() {
    this.load();
    this.timer = setInterval(() => this.load(), 60000);
  }

  load() {
    this.live.getVodChannel().subscribe({
      next: (data) => {
        this.nowPlaying = data.nowPlaying;
        setTimeout(() => this.initPlayer(), 0);
      }
    });
  }

  initPlayer() {
    if (!this.videoRef) return;
    const video = this.videoRef.nativeElement;

    if (Hls.isSupported()) {
      if (this.hls) this.hls.destroy();
      this.hls = new Hls();
      this.hls.loadSource(this.nowPlaying.hls);
      this.hls.attachMedia(video);
    } else {
      video.src = this.nowPlaying.hls;
      video.load();
    }

    // sync posizione
    if (this.nowPlaying.position > 0) {
      video.currentTime = this.nowPlaying.position;
    }

    // 🔒 Anti-pausa
    video.onpause = () => {
      video.play().catch(() => {});
    };

    video.play().catch(() => {});
  }

  ngOnDestroy() {
    if (this.hls) this.hls.destroy();
    if (this.timer) clearInterval(this.timer);
  }
}

