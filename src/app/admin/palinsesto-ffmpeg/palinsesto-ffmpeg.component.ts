
// src/app/admin/palinsesto-ffmpeg/palinsesto-ffmpeg.component.ts
// Componente per la gestione del palinsesto con FFmpeg
// src/app/admin/palinsesto-ffmpeg/palinsesto-ffmpeg.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AdminStorageService } from 'src/app/services/admin-storage-sync.service';
import { PalinsestoFFmpegService } from 'src/app/services/palinsesto-ffmpeg.service';
import {
  FfmpegScheduleItem,
  FfmpegVodItem,
  OnAirResponse
} from 'src/app/types/palinsesto-ffmpeg';

@Component({
  selector: 'app-palinsesto-ffmpeg',
  templateUrl: './palinsesto-ffmpeg.component.html',
  styleUrls: ['./palinsesto-ffmpeg.component.scss']
})
export class PalinsestoFfmpegComponent implements OnInit, OnDestroy {

  nowUtc = '';
  currentItem: OnAirResponse['current'] = null;
  nextItem: OnAirResponse['next'] = null;

  videos: FfmpegVodItem[] = [];
  schedule: FfmpegScheduleItem[] = [];

  refreshing = false;
  saving = false;

  private timer: any;

  constructor(
    private ffmpegService: PalinsestoFFmpegService,
    private storageService: AdminStorageService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadVideos();
    this.loadSchedule();
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  tick() {
    this.nowUtc = new Date().toISOString().substring(11, 19);

    this.ffmpegService.getCurrentOnAir().subscribe({
      next: (data) => {
        this.currentItem = data.current;
        this.nextItem = data.next;
      },
      error: () => {
        // non blocchiamo la UI per errori di polling
      }
    });
  }

  loadVideos() {
    this.ffmpegService.getVideos().subscribe({
      next: (v) => (this.videos = v),
      error: () => this.showToast('Errore caricamento video', 'danger')
    });
  }

  loadSchedule() {
    this.ffmpegService.getSchedule().subscribe({
      next: (s) => (this.schedule = s),
      error: () => this.showToast('Errore caricamento palinsesto', 'danger')
    });
  }

  // ➕ ADD VIDEO (senza calcoli lato frontend)
  addToSchedule(v: FfmpegVodItem) {
    const item: FfmpegScheduleItem = {
      videoId: v.id,
      title: v.title,
      filename: v.filename,
      order: this.schedule.length,
      durationMs: v.durationMs,
      // startAt/endAt NON si calcolano qui
    };

    this.schedule = [...this.schedule, item];
    this.reorder();
  }

  // ❌ REMOVE
  removeFromSchedule(i: number) {
    const copy = [...this.schedule];
    copy.splice(i, 1);
    this.schedule = copy;
    this.reorder();
  }

  reorder() {
    this.schedule = this.schedule.map((s, i) => ({ ...s, order: i }));
  }

  // ✅ SOLO IL PRIMO decide startAt (senza cancellare nulla)
  onFirstStartAtChange(value: string | string[] | null | undefined) {
    if (!this.schedule.length) return;

    // ion-datetime può tornare string oppure array/null
    if (typeof value === 'string' && value) {
      this.schedule[0] = {
        ...this.schedule[0],
        startAt: value
      };
      return;
    }

    // Se value non è stringa valida, NON cancelliamo startAt
    // (evita i reset quando il DOM rerenderizza)
  }

  // 💾 SAVE (backend calcola endAt e startAt dei successivi)
  saveSchedule() {
    if (!this.schedule.length) {
      this.showToast('Palinsesto vuoto', 'warning');
      return;
    }

    if (!this.schedule[0].startAt) {
      this.showToast('Imposta data e ora del primo video', 'warning');
      return;
    }

    this.saving = true;

    // Invia al backend solo i campi necessari
    const payload = this.schedule.map((s, i) => ({
      videoId: s.videoId,
      filename: s.filename,
      // solo il primo manda startAt
      startAt: i === 0 ? s.startAt : undefined
    }));

    this.ffmpegService.saveSchedule(payload as any).subscribe({
      next: () => {
        // 🔥 Fonte di verità = backend
        this.loadSchedule();
        this.showToast('Palinsesto salvato con successo', 'success');
        this.saving = false;
      },
      error: (err) => {
        this.saving = false;
        this.showToast(err?.error?.error || 'Errore durante il salvataggio', 'danger');
      }
    });
  }

  refreshFromBunny() {
    this.refreshing = true;

    this.storageService.syncBunny().subscribe({
      next: () => {
        this.loadVideos();
        this.refreshing = false;
        this.showToast('Video aggiornati da Bunny', 'success');
      },
      error: () => {
        this.refreshing = false;
        this.showToast('Errore durante il sync con Bunny', 'danger');
      }
    });
  }

  isOnAir(item: FfmpegScheduleItem): boolean {
    if (!item.startAt || !item.endAt) return false;
    const now = Date.now();
    return now >= new Date(item.startAt).getTime() && now < new Date(item.endAt).getTime();
  }

  getSlotDurationSeconds(item: FfmpegScheduleItem): number {
    // se start/end presenti (da backend) calcolo differenza
    if (item.startAt && item.endAt) {
      const start = new Date(item.startAt).getTime();
      const end = new Date(item.endAt).getTime();
      return Math.max(0, Math.round((end - start) / 1000));
    }
    // altrimenti mostro durata video
    return Math.max(0, Math.round((item.durationMs ?? 0) / 1000));
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4500,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}

