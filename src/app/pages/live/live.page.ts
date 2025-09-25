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
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit, OnDestroy, AfterViewInit {
  private hls?: Hls;
  public streamUrl: string = '';
  public online: boolean = false;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    // Recupera lo stato del live dal backend
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
    // Aspetta che Angular monti il DOM prima di inizializzare il player
    setTimeout(() => this.initPlayer(), 500);
  }

  private initPlayer() {
    const video = document.getElementById('liveVideo') as HTMLVideoElement;
    if (!video || !this.streamUrl) {
      console.warn('⚠️ Nessun video o streamUrl trovato');
      return;
    }

    if (Hls.isSupported()) {
      this.hls = new Hls({ debug: true }); // debug per log estesi
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
      console.log('ℹ️ Uso supporto nativo HLS del browser');
      video.src = this.streamUrl;
      video
        .play()
        .catch((err) => console.error('❌ Autoplay bloccato:', err));
    } else {
      console.error('❌ HLS non supportato in questo browser');
    }
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
      console.log('🧹 HLS distrutto');
    }
  }
}

