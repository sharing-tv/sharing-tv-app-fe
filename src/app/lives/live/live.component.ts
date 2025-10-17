// src/app/lives/live/live.component.ts

import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { LiveService, LiveStatus } from 'src/app/services/live.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit, OnDestroy {
  @ViewChild('liveVideo', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  public online = false;
  public muted = true;
  public loading = true;

  private sub?: Subscription;

  constructor(private liveService: LiveService) {}

  async ngOnInit(): Promise<void> {
    // 1️⃣ Carica la configurazione HLS dal backend
    await this.liveService.loadStreamConfig();

    // 2️⃣ Avvia il monitoraggio dello stato live
    this.liveService.startMonitoring();

    // 3️⃣ Osserva i cambiamenti reali di stato
    this.sub = this.liveService.liveStatus$.subscribe(async (status: LiveStatus) => {
      this.loading = false;

      if (status.online !== this.online) {
        this.online = status.online;

        if (this.online && this.videoRef?.nativeElement) {
          console.log('🎥 Stream online — avvio player');
          try {
            await this.liveService.initPlayer(this.videoRef.nativeElement, this.muted);
          } catch (err) {
            console.warn('⚠️ Impossibile avviare il player automaticamente:', err);
          }
        } else if (!this.online) {
          console.warn('🔴 Stream offline — stop player');
          this.liveService.stopPlayer();
        }
      }
    });
  }

  /** 🔊 Attiva manualmente l’audio */
  public unmuteVideo(): void {
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.muted = false;
      this.muted = false;
      console.log('🔊 Audio attivato manualmente');
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.liveService.stopPlayer();
  }
}

