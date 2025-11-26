
import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Hls from 'hls.js';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-mini-live-vod',
  templateUrl: './mini-live-vod.component.html',
  styleUrls: ['./mini-live-vod.component.scss']
})
export class MiniLiveVodComponent implements OnInit, OnDestroy {

  @ViewChild('miniPlayer', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  title = '';
  hls?: Hls;
  refreshTimer: any;

  constructor(private liveService: LiveService, private router: Router) {}

  goToLive() {
    this.router.navigate(['/live-vod']);
  }

  ngOnInit() {
    this.loadNowPlaying();

    // Aggiorna ogni 60 secondi
    this.refreshTimer = setInterval(() => {
      this.loadNowPlaying();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.hls) this.hls.destroy();
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }

  private loadNowPlaying() {
    this.liveService.getVodChannel().subscribe({
      next: (data) => {
        this.title = data.nowPlaying.title;
        const hlsUrl = data.nowPlaying.hls;

        setTimeout(() => this.initPlayer(hlsUrl), 0);
      },
      error: err => console.error('Errore mini-live:', err)
    });
  }

  private initPlayer(hlsUrl: string) {
    const video = this.videoRef.nativeElement;

    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;

    if (Hls.isSupported()) {
      if (this.hls) this.hls.destroy();
      this.hls = new Hls({ enableWorker: true });
      this.hls.loadSource(hlsUrl);
      this.hls.attachMedia(video);
    } else {
      video.src = hlsUrl;
    }

    video.play().catch(() => {});
  }
}

