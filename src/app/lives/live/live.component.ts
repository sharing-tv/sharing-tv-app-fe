// src/app/lives/live/live.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import Hls from 'hls.js';
import { LiveService, LiveStatus } from 'src/app/services/live.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit, OnDestroy, AfterViewInit {
  private hls?: Hls;
  public streamUrl: string = '';
  public online: boolean = false;
  public muted: boolean = true; // 🔇 parte mutato per compatibilità mobile

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.liveService.getLiveStatus().subscribe({
      next: (data: LiveStatus) => {
        this.streamUrl = data.streamUrl || environment.liveHlsUrl;
        this.online = data.online;
        console.log('✅ Stream URL ricevuto:', this.streamUrl);
      },
      error: (err) =>
        console.error('❌ Errore caricamento live dal backend:', err),
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initPlayer(), 500);
  }

  private initPlayer() {
    const video = document.getElementById('liveVideo') as HTMLVideoElement;
    if (!video || !this.streamUrl) {
      console.warn('⚠️ Nessun video o streamUrl trovato');
      return;
    }

    video.muted = this.muted;

    if (Hls.isSupported()) {
      this.hls = new Hls({ debug: false });
      this.hls.loadSource(this.streamUrl);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        console.log(
          `📑 Manifest caricato, ${data.levels.length} qualità trovate`
        );
        video
          .play()
          .catch((err) => console.error('❌ Autoplay bloccato:', err));
      });

      this.hls.on(Hls.Events.ERROR, (_event, data) => {
        console.error('❌ Errore HLS:', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.streamUrl;
      video.play().catch((err) => console.error('❌ Autoplay bloccato:', err));
    } else {
      console.error('❌ HLS non supportato in questo browser');
    }
  }

  public unmuteVideo() {
    const video = document.getElementById('liveVideo') as HTMLVideoElement;
    if (video) {
      video.muted = false;
      this.muted = false;
      console.log('🔊 Audio attivato manualmente');
    }
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
      console.log('🧹 HLS distrutto');
    }
  }
}

