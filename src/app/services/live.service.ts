// src/app/services/live.service.ts
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, switchMap, catchError, of, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import Hls from 'hls.js';

export interface LiveStatus {
  streamUrl: string;
  online: boolean;
}

@Injectable({ providedIn: 'root' })
export class LiveService {
  private readonly apiUrl = `${environment.apiBaseUrl}/live`;
  private readonly pollIntervalMs = 10000;
  private liveUrlFromBackend = '';

  public readonly liveStatus$ = new BehaviorSubject<LiveStatus>({
    streamUrl: '',
    online: false,
  });

  private videoEl?: HTMLVideoElement;
  private hlsInstance?: Hls;

  constructor(private http: HttpClient, private zone: NgZone) {}

  /** 🔹 Carica dinamicamente la URL HLS dal backend */
  async loadStreamConfig(): Promise<void> {
    try {
      const res: any = await firstValueFrom(this.http.get(`${this.apiUrl}/config`));
      this.liveUrlFromBackend = res?.streamUrl || '';
      console.log('🌍 URL HLS ricevuta dal backend:', this.liveUrlFromBackend);
    } catch (err) {
      console.error('❌ Errore nel caricamento config HLS:', err);
    }
  }

  /** 🔹 Avvia il monitoraggio periodico dello stato live */
  startMonitoring(): void {
    this.fetchLiveStatus();

    interval(this.pollIntervalMs)
      .pipe(
        switchMap(() =>
          this.http.get<LiveStatus>(this.apiUrl).pipe(
            catchError((err) => {
              console.error('❌ Errore nel controllo live:', err);
              return of({ streamUrl: '', online: false });
            })
          )
        )
      )
      .subscribe((status) => this.liveStatus$.next(status));
  }

  /** 🔹 Effettua un singolo controllo immediato */
  private fetchLiveStatus(): void {
    this.http
      .get<LiveStatus>(this.apiUrl)
      .pipe(catchError(() => of({ streamUrl: '', online: false })))
      .subscribe((status) => this.liveStatus$.next(status));
  }

  /** 🔹 Inizializza il player HLS */
  async initPlayer(videoElement: HTMLVideoElement, muted = true): Promise<void> {
    const streamUrl = this.liveUrlFromBackend || environment.liveHlsUrl;
    if (!videoElement || !streamUrl) {
      console.warn('⚠️ initPlayer chiamato senza stream valido');
      return;
    }

    // Arresta eventuale player precedente
    this.stopPlayer();
    this.videoEl = videoElement;
    this.videoEl.muted = muted;

    // 🔹 Caso Safari/iOS — HLS nativo
    if (this.videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoEl.src = streamUrl;
      try {
        await this.videoEl.play();
        console.log('✅ HLS nativo avviato (Safari/iOS)');
      } catch (err) {
        console.warn('⚠️ Autoplay bloccato (Safari):', err);
      }
      return;
    }

    // 🔹 Caso browser moderni — usa Hls.js
    if (Hls.isSupported()) {
      this.hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 60,
        liveSyncDuration: 8,
        liveMaxLatencyDuration: 16,
        maxLiveSyncPlaybackRate: 1.0,
        maxBufferLength: 45,
        maxBufferHole: 3,
        maxStarvationDelay: 5,
        fragLoadingTimeOut: 20000,
        manifestLoadingTimeOut: 15000,
        manifestLoadingRetryDelay: 2000,
        manifestLoadingMaxRetry: 5,
        fragLoadingMaxRetry: 5,
        fragLoadingRetryDelay: 2000,
      });

      console.log('🔗 Carico stream HLS:', streamUrl);
      this.hlsInstance.loadSource(streamUrl);
      this.hlsInstance.attachMedia(this.videoEl);

      // Manifest caricato
      this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('✅ HLS manifest parsed, avvio playback');
        this.zone.runOutsideAngular(() => {
          this.videoEl!.play().catch((err) => console.warn('⚠️ Autoplay bloccato:', err));
        });
      });

      // Gestione errori e recovery
      this.hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        console.error('💥 HLS error:', `details=${data.details}`, `type=${data.type}`, `fatal=${data.fatal}`, data);

        if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR && !data.fatal) {
          console.warn('⏸️ Buffer stall rilevato — forzo resume');
          this.videoEl?.play().catch(() => setTimeout(() => this.videoEl?.play(), 1500));
        }

        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn('🌐 Tentativo di recupero rete...');
              this.hlsInstance?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn('🎞️ Tentativo di recupero media...');
              this.hlsInstance?.recoverMediaError();
              break;
            default:
              console.error('🛑 Errore HLS fatale, distruggo istanza');
              this.stopPlayer();
              break;
          }
        }
      });
    } else {
      console.error('❌ HLS non supportato su questo browser');
    }
  }

  /** 🔹 Arresta il player e libera risorse */
  stopPlayer(): void {
    try {
      this.hlsInstance?.destroy();
    } catch (e) {
      console.warn('⚠️ Errore nella distruzione Hls:', e);
    }
    this.hlsInstance = undefined;

    if (this.videoEl) {
      this.videoEl.removeAttribute('src');
      this.videoEl.load();
    }
  }
}

