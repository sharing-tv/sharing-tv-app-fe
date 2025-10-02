// src/app/lives/live/live.component.ts
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { WhipService } from 'src/app/services/whip.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements AfterViewInit, OnDestroy {
  public online = true; // con WHIP non c’è un health-check semplice → presumi online
  public muted = true;
  private videoEl?: HTMLVideoElement;

  constructor(private whip: WhipService) {}

  async ngAfterViewInit() {
    this.videoEl = document.getElementById('liveVideo') as HTMLVideoElement;
    if (!this.videoEl) return;

    this.videoEl.muted = this.muted;

    try {
      // 👉 Chiede al service di avviare la sessione WHIP
      const whipProxyUrl = `${environment.apiBaseUrl}/whip`;
      await this.whip.startPlayback(this.videoEl, whipProxyUrl);
      console.log('✅ WebRTC WHIP playback avviato');
    } catch (err) {
      console.error('❌ Errore avvio WHIP:', err);
      this.online = false;
    }
  }

  public unmuteVideo() {
    if (this.videoEl) {
      this.videoEl.muted = false;
      this.muted = false;
      console.log('🔊 Audio attivato manualmente');
    }
  }

  ngOnDestroy() {
    this.whip.stopPlayback();
    console.log('🧹 WHIP session terminata');
  }
}

