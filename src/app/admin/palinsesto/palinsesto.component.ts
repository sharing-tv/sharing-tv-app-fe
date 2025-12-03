
// src/app/admin/palinsesto/palinsesto.component.ts

import { Component, OnInit } from '@angular/core';
import {
  PalinsestoService,
  VodListItem,
  ChannelItem,
  ChannelDto
} from 'src/app/services/palinsesto.service';
import { ToastController } from '@ionic/angular';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface PalinsestoItem {
  vod: string;
  title: string;
  bunnyId: string;
  length: number;          // durata in ms (bunny)

  startAt?: string | null; // ISO UTC reale
  endAt?: string | null;   // ISO UTC (calcolato lato FE)

  editDate?: string;       // YYYY-MM-DD
  editHour?: number;
  editMinute?: number;
  editSecond?: number;

  conflict?: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-palinsesto',
  templateUrl: './palinsesto.component.html',
  styleUrls: ['./palinsesto.component.scss'],
})
export class PalinsestoComponent implements OnInit {

  loading = false;
  saving = false;
  error: string | null = null;

  vodList: VodListItem[] = [];
  channelSlug = 'vod-channel-1';
  loop = true;
  items: PalinsestoItem[] = [];

  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);
  seconds = Array.from({ length: 60 }, (_, i) => i);

  timeline: {
    title: string;
    start: number;   // timestamp ms UTC
    end: number;     // timestamp ms UTC
    width: number;   // minuti sulla giornata
    offset: number;  // minuti da mezzanotte
    conflict: boolean;
  }[] = [];

  colors = [
    '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
    '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
  ];

  constructor(
    private palinsestoService: PalinsestoService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  // -------------------------------------------------
  //  UTILITIES PUBBLICHE PER IL TEMPLATE
  // -------------------------------------------------

  /** Converte timestamp/ISO → HH:mm:ss (sempre in UTC) */
  public formatHHMMSS(input: string | number | null | undefined): string {
    if (!input) return '--:--:--';

    const d = typeof input === 'number' ? new Date(input) : new Date(input);
    if (isNaN(d.getTime())) return '--:--:--';

    const hh = d.getUTCHours().toString().padStart(2, '0');
    const mm = d.getUTCMinutes().toString().padStart(2, '0');
    const ss = d.getUTCSeconds().toString().padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
  }

  /** ms → m:ss (per la lista VOD disponibili) */
  public formatDuration(ms: number): string {
    if (!ms || ms <= 0) return '0:00';
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // -------------------------------------------------
  //  LOAD DATA
  // -------------------------------------------------

  /** length "12345" o "HH:MM:SS" → ms */
  private parseLength(len: any): number {
    if (!len) return 0;
    if (typeof len === 'number') return len;
    if (typeof len === 'string' && len.includes(':')) {
      const [h, m, s] = len.split(':').map(Number);
      return (h * 3600 + m * 60 + s) * 1000;
    }
    return 0;
  }

  loadData() {
    this.loading = true;
    this.error = null;

    this.palinsestoService.getVodList().subscribe({
      next: (vods) => {
        this.vodList = vods;

        this.palinsestoService.getChannel(this.channelSlug).subscribe({
          next: (ch: ChannelDto) => {
            this.loop = ch.loop ?? true;

            const items = ch.items || [];

            this.items = items.map((it) => {
              const match = vods.find(v => v.id === it.vod);
              const startAtDate = it.startAt ? new Date(it.startAt) : null;

              let editDate = '';
              let hh = 0, mm = 0, ss = 0;

              if (startAtDate && !isNaN(startAtDate.getTime())) {
                editDate = startAtDate.toISOString().substring(0, 10); // YYYY-MM-DD
                hh = startAtDate.getUTCHours();
                mm = startAtDate.getUTCMinutes();
                ss = startAtDate.getUTCSeconds();
              }

              return {
                vod: it.vod,
                title: match?.title || '(missing)',
                bunnyId: match?.bunnyId || '',
                length: this.parseLength(match?.length),

                startAt: it.startAt ?? null,
                endAt: null,

                editDate,
                editHour: hh,
                editMinute: mm,
                editSecond: ss,

                conflict: false,
                editing: false
              };
            });

            this.recalculateTimes();
            this.loading = false;
          },
          error: () => {
            this.error = 'Errore caricando il canale.';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'Errore caricando la lista VOD.';
        this.loading = false;
      }
    });
  }

  // -------------------------------------------------
  //  EDIT LOGIC
  // -------------------------------------------------

  drop(event: CdkDragDrop<PalinsestoItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.recalculateTimes();
  }

  addVod(v: VodListItem) {
    const nowUTC = new Date(); // già in UTC internamente

    this.items.push({
      vod: v.id,
      title: v.title,
      bunnyId: v.bunnyId,
      length: this.parseLength(v.length),

      startAt: nowUTC.toISOString(),
      endAt: null,

      editDate: nowUTC.toISOString().substring(0, 10),
      editHour: nowUTC.getUTCHours(),
      editMinute: nowUTC.getUTCMinutes(),
      editSecond: nowUTC.getUTCSeconds(),

      conflict: false,
      editing: false
    });

    this.recalculateTimes();
  }

  saveStartTime(item: PalinsestoItem) {
    if (!item.editDate) return;

    const [year, month, day] = item.editDate.split('-').map(Number);
    const hh = item.editHour ?? 0;
    const mm = item.editMinute ?? 0;
    const ss = item.editSecond ?? 0;

    // UTC puro
    const ts = Date.UTC(year, month - 1, day, hh, mm, ss);
    item.startAt = new Date(ts).toISOString();
    item.editing = false;

    this.recalculateTimes();
  }

  removeAt(i: number) {
    this.items.splice(i, 1);
    this.recalculateTimes();
  }

  moveUp(i: number) {
    if (i === 0) return;
    [this.items[i - 1], this.items[i]] = [this.items[i], this.items[i - 1]];
    this.recalculateTimes();
  }

  moveDown(i: number) {
    if (i >= this.items.length - 1) return;
    [this.items[i + 1], this.items[i]] = [this.items[i], this.items[i + 1]];
    this.recalculateTimes();
  }

  // -------------------------------------------------
  //  TIMELINE + CONFLITTI
  // -------------------------------------------------

  recalculateTimes() {
    // Ordiniamo per startAt (UTC ISO)
    this.items.sort((a, b) => {
      if (!a.startAt) return 1;
      if (!b.startAt) return -1;
      return a.startAt.localeCompare(b.startAt);
    });

    this.timeline = [];
    let lastEnd: number | null = null;

    for (const item of this.items) {
      if (!item.startAt) continue;

      const start = new Date(item.startAt).getTime();
      const end = start + item.length;

      item.endAt = new Date(end).toISOString();

      // reset conflitto di default
      item.conflict = false;

      if (lastEnd !== null) {
        const epsilon = 2000; // 2 secondi di tolleranza

        // Conflitto solo se l'overlap è > 2 secondi
        if (start < (lastEnd - epsilon)) {
          item.conflict = true;
        }
      }

      lastEnd = end;

      // Timeline: minuti da mezzanotte (sempre UTC)
      const dStart = new Date(start);
      const dEnd = new Date(end);

      const startMin =
        dStart.getUTCHours() * 60 +
        dStart.getUTCMinutes() +
        dStart.getUTCSeconds() / 60;

      const endMin =
        dEnd.getUTCHours() * 60 +
        dEnd.getUTCMinutes() +
        dEnd.getUTCSeconds() / 60;

      this.timeline.push({
        title: item.title,
        start,
        end,
        width: Math.max(1, endMin - startMin), // almeno 1 minuto visivo
        offset: startMin,
        conflict: item.conflict ?? false
      });
    }
  }

  // -------------------------------------------------
  //  SAVE
  // -------------------------------------------------

  async save() {
    this.saving = true;

    const payload: ChannelItem[] = this.items.map(it => ({
      vod: it.vod,
      startAt: it.startAt ?? null
    }));

    this.palinsestoService
      .saveChannel(this.channelSlug, payload, this.loop)
      .subscribe({
        next: async () => {
          this.saving = false;
          const t = await this.toastCtrl.create({
            message: 'Palinsesto salvato!',
            duration: 1500,
            color: 'success'
          });
          t.present();
        },
        error: async () => {
          this.saving = false;
          const t = await this.toastCtrl.create({
            message: 'Errore nel salvataggio',
            duration: 1500,
            color: 'danger'
          });
          t.present();
        }
      });
  }

  syncVod() {
    this.palinsestoService.syncVod().subscribe({
      next: () => this.loadData(),
      error: () => alert('Errore sync VOD')
    });
  }
}

