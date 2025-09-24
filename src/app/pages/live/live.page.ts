import { Component, OnInit, OnDestroy } from '@angular/core';
import Hls from 'hls.js';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit, OnDestroy {
  private hls?: Hls;
  public streamUrl: string = '';
  public online: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Recupera lo stream dal backend
    this.http
      .get<{ streamUrl: string; online: boolean }>(
        `${environment.apiBaseUrl}/live`
      )
      .subscribe({
        next: (data) => {
          this.streamUrl = data.streamUrl || environment.liveHlsUrl;
          this.online = data.online;
          this.initPlayer();
        },
        error: (err) => console.error('Errore caricamento live:', err),
      });
  }

  initPlayer() {
    const video = document.getElementById('liveVideo') as HTMLVideoElement;

    if (!video || !this.streamUrl) return;

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(this.streamUrl);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.error('Autoplay blocked:', err));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.streamUrl;
      video
        .play()
        .catch((err) => console.error('Autoplay blocked:', err));
    }
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  }
}

