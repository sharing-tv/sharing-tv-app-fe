// src/app/services/live.service.ts

import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  interval,
  switchMap,
  catchError,
  of,
  firstValueFrom,
} from 'rxjs';
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

  private lastOnlineStatus = false;
  private videoEl?: HTMLVideoElement;
  private hlsInstance?: Hls;

  constructor(private http: HttpClient, private zone: NgZone) {}

  /** 🔹 Carica la URL dello stream dal backend */
  async loadStreamConfig(): Promise<void> {
    try {
      const res: any = await firstValueFrom(this.http.get(`${this.apiUrl}/config`));
      this.liveUrlFromBackend = res?.streamUrl || '';
      console.log('🌍 URL HLS dal backend:', this.liveUrlFromBackend);
    } catch (err) {
      console.error('❌ Errore caricamento config HLS:', err);
    }
  }

  /** 🔹 Controlla stato live ogni 10s */
  startMonitoring(): void {
    this.fetchLiveStatus();
    interval(this.pollIntervalMs)
      .pipe(
        switchMap(() =>
          this.http.get<LiveStatus>(this.apiUrl).pipe(
            catchError(() => of({ streamUrl: '', online: false }))
          )
        )
      )
      .subscribe((status) => {
        if (status.online !== this.lastOnlineStatus) {
          this.lastOnlineStatus = status.online;
          this.liveStatus$.next(status);
        }
      });
  }

  private fetchLiveStatus(): void {
    this.http
      .get<LiveStatus>(this.apiUrl)
      .pipe(catchError(() => of({ streamUrl: '', online: false })))
      .subscribe((status) => {
        this.lastOnlineStatus = status.online;
        this.liveStatus$.next(status);
      });
  }

  /** 🔹 Inizializza il player video */
  async initPlayer(videoElement: HTMLVideoElement, muted = true): Promise<void> {
    const streamUrl = this.liveUrlFromBackend || environment.liveHlsUrl;
    if (!videoElement || !streamUrl) return;

    this.stopPlayer();
    this.videoEl = videoElement;
    this.videoEl.muted = muted;
    this.videoEl.playsInline = true;

    // 🔍 Safari / iOS nativo
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

    if (isIOS || isSafari || this.videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('🍎 Safari/iOS: HLS nativo');
      this.videoEl.src = streamUrl;
      try {
        await this.videoEl.play();
        console.log('✅ Playback nativo avviato');
      } catch (err) {
        console.warn('⚠️ Richiesta interazione utente (autoplay bloccato):', err);
      }
      return;
    }

    // 🔹 Hls.js per gli altri browser
    if (Hls.isSupported()) {
      this.hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });
      this.hlsInstance.loadSource(streamUrl);
      this.hlsInstance.attachMedia(this.videoEl);

      this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        this.zone.runOutsideAngular(() => {
          this.videoEl!.play().catch((err) =>
            console.warn('⚠️ Autoplay bloccato:', err)
          );
        });
      });

      this.hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('💥 Errore HLS fatale:', data);
          this.stopPlayer();
        }
      });
    }
  }

  /** 🔹 Ferma e resetta il player */
  stopPlayer(): void {
    try {
      this.hlsInstance?.destroy();
    } catch {}
    this.hlsInstance = undefined;

    if (this.videoEl) {
      this.videoEl.removeAttribute('src');
      this.videoEl.load();
    }
  }
}

