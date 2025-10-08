// src/app/services/live.service.ts
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, switchMap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import Hls from 'hls.js';

export interface LiveStatus {
  streamUrl: string;
  online: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  private readonly apiUrl = `${environment.apiBaseUrl}/live`;
  private readonly pollIntervalMs = 10000; // ogni 10s

  // Stato osservabile condiviso
  public readonly liveStatus$ = new BehaviorSubject<LiveStatus>({
    streamUrl: '',
    online: false,
  });

  private videoEl?: HTMLVideoElement;
  private hlsInstance?: Hls;

  constructor(private http: HttpClient, private zone: NgZone) {}

  /** Avvia il polling periodico per lo stato della live */
  startMonitoring(): void {
    // 🔹 Primo controllo immediato
    this.fetchLiveStatus();

    // 🔹 Polling ogni 10 secondi
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

  /** Effettua subito una richiesta singola di stato */
  private fetchLiveStatus(): void {
    this.http
      .get<LiveStatus>(this.apiUrl)
      .pipe(
        catchError(() => of({ streamUrl: '', online: false }))
      )
      .subscribe((status) => this.liveStatus$.next(status));
  }

  /** Inizializza il player video con Hls.js o supporto nativo */
  async initPlayer(videoElement: HTMLVideoElement, streamUrl: string, muted = true): Promise<void> {
    if (!videoElement || !streamUrl) return;

    this.videoEl = videoElement;
    this.videoEl.muted = muted;

    // 🔸 Pulizia eventuale player precedente
    this.stopPlayer();

    // 🔹 Caso Safari / iOS — HLS nativo
    if (this.videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoEl.src = streamUrl;
      try {
        await this.videoEl.play();
      } catch (err) {
        console.warn('⚠️ Autoplay bloccato (Safari):', err);
      }
      return;
    }

    // 🔹 Browser moderni — usa Hls.js
    if (Hls.isSupported()) {
      this.hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
      });

      this.hlsInstance.loadSource(streamUrl);
      this.hlsInstance.attachMedia(this.videoEl);

      this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        this.zone.runOutsideAngular(() => {
          this.videoEl!.play().catch((err) => console.warn('⚠️ Autoplay bloccato:', err));
        });
      });

      this.hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        console.error('💥 HLS error:', data);
      });
    } else {
      console.error('❌ HLS non supportato su questo browser');
    }
  }

  /** Distrugge istanze Hls e resetta il player */
  stopPlayer(): void {
    try {
      this.hlsInstance?.destroy();
    } catch (e) {
      console.warn('⚠️ Errore nella distruzione Hls:', e);
    }
    this.hlsInstance = undefined;

    if (this.videoEl) {
      this.videoEl.src = '';
      this.videoEl.load();
    }
  }
}

