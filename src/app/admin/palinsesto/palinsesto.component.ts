
// src/app/admin/palinsesto/palinsesto.component.ts

// src/app/admin/palinsesto/palinsesto.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
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
  length: number;

  startAt?: string | null;
  endAt?: string | null;

  editDate?: string;
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
export class PalinsestoComponent implements OnInit, OnDestroy {

  loading = false;
  saving = false;
  error: string | null = null;

  vodList: VodListItem[] = [];
  channelSlug = 'vod-channel-1';
  loop = true;
  items: PalinsestoItem[] = [];

  vodSearch = '';
  vodSort: 'name' | 'date' = 'name';

  utcNow: string = '';
  private utcInterval: any;

  // zoom: px per minuto (24h = 1440 minuti)
  zoomFactor = 1; // di base: 24h

  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);
  seconds = Array.from({ length: 60 }, (_, i) => i);

  timeline: {
    title: string;
    start: number;
    end: number;
    width: number;   // minuti
    offset: number;  // minuti da mezzanotte
    conflict: boolean;
    free: boolean;   // true = spazio libero
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

    this.updateUtcTime();
    this.utcInterval = setInterval(() => this.updateUtcTime(), 1000);

    // zoom iniziale: 24h
    this.setZoom(24);
  }

  ngOnDestroy() {
    if (this.utcInterval) {
      clearInterval(this.utcInterval);
    }
  }

  updateUtcTime() {
    const now = new Date();
    const hh = now.getUTCHours().toString().padStart(2, '0');
    const mm = now.getUTCMinutes().toString().padStart(2, '0');
    const ss = now.getUTCSeconds().toString().padStart(2, '0');
    this.utcNow = `${hh}:${mm}:${ss}`;
  }

  // ----------------------------------------
  // ZOOM TIMELINE
  // ----------------------------------------

  setZoom(hours: number) {
    const safeHours = Math.max(1, Math.min(24, hours));
    // 24h → zoomFactor = 1, 12h → 2, 6h → 4, ecc.
    this.zoomFactor = 24 / safeHours;
  }

  // ----------------------------------------
  // FORMATTERS
  // ----------------------------------------

  public formatHHMMSS(input: string | number | null | undefined): string {
    if (!input) return '--:--:--';

    const d = typeof input === 'number' ? new Date(input) : new Date(input);
    if (isNaN(d.getTime())) return '--:--:--';

    const hh = d.getUTCHours().toString().padStart(2, '0');
    const mm = d.getUTCMinutes().toString().padStart(2, '0');
    const ss = d.getUTCSeconds().toString().padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
  }

  public formatDuration(ms: number): string {
    if (!ms || ms <= 0) return '0:00';
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // ----------------------------------------
  // VOD FILTERS + SORT
  // ----------------------------------------

  get filteredVods() {
    let list = [...this.vodList];

    if (this.vodSearch.trim().length > 0) {
      list = list.filter(v =>
        v.title.toLowerCase().includes(this.vodSearch.toLowerCase())
      );
    }

    if (this.vodSort === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => (a.length ?? 0) - (b.length ?? 0));
    }

    return list;
  }

  // ----------------------------------------
  // LOAD DATA
  // ----------------------------------------

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
                editDate = startAtDate.toISOString().substring(0, 10);
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

  // ----------------------------------------
  // EDIT LOGIC
  // ----------------------------------------

  drop(event: CdkDragDrop<PalinsestoItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.recalculateTimes();
  }

  /** ADD VOD → in cima + startAt = fine ultimo */
  addVod(v: VodListItem) {
    const nowUTC = new Date();
    let startAtISO = nowUTC.toISOString();

    if (this.items.length > 0) {
      const last = this.items[this.items.length - 1];
      if (last.endAt) {
        startAtISO = new Date(last.endAt).toISOString();
      }
    }

    const d = new Date(startAtISO);

    const newItem: PalinsestoItem = {
      vod: v.id,
      title: v.title,
      bunnyId: v.bunnyId,
      length: this.parseLength(v.length),

      startAt: startAtISO,
      endAt: null,

      editDate: d.toISOString().substring(0, 10),
      editHour: d.getUTCHours(),
      editMinute: d.getUTCMinutes(),
      editSecond: d.getUTCSeconds(),

      conflict: false,
      editing: false
    };

    this.items.unshift(newItem);
    this.recalculateTimes();
  }

  saveStartTime(item: PalinsestoItem) {
    if (!item.editDate) return;

    const [year, month, day] = item.editDate.split('-').map(Number);
    const hh = item.editHour ?? 0;
    const mm = item.editMinute ?? 0;
    const ss = item.editSecond ?? 0;

    const ts = Date.UTC(year, month - 1, day, hh, mm, ss);
    item.startAt = new Date(ts).toISOString();
    item.editing = false;

    this.recalculateTimes();
  }

  removeItem(item: PalinsestoItem) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.recalculateTimes();
    }
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

  // ----------------------------------------
  // TIMELINE + SPAZI LIBERI
  // ----------------------------------------

  recalculateTimes() {
    // Ordina i contenuti per startAt
    this.items.sort((a, b) => {
      if (!a.startAt) return 1;
      if (!b.startAt) return -1;
      return a.startAt.localeCompare(b.startAt);
    });

    const events: {
      title: string;
      start: number;
      end: number;
      width: number;
      offset: number;
      conflict: boolean;
      free: boolean;
    }[] = [];
    let lastEnd: number | null = null;

    // --- COSTRUZIONE EVENTI
    for (const item of this.items) {
      if (!item.startAt) continue;

      const start = new Date(item.startAt).getTime();
      const end = start + item.length;

      item.endAt = new Date(end).toISOString();
      item.conflict = false;

      if (lastEnd !== null) {
        const epsilon = 2000;
        if (start < (lastEnd - epsilon)) {
          item.conflict = true;
        }
      }

      lastEnd = end;

      // Minuti da mezzanotte
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

      events.push({
        title: item.title,
        start,
        end,
        width: Math.max(1, endMin - startMin), // minuti
        offset: startMin,
        conflict: item.conflict ?? false,
        free: false
      });
    }

    // --- CALCOLO SPAZI LIBERI SU 24H UTC
    const now = new Date();
    const fullDayStart = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0, 0, 0, 0
    ); // 00:00 UTC di oggi

    const fullDayEnd = fullDayStart + 24 * 3600 * 1000;

    const gaps: typeof events = [];
    let cursor = fullDayStart;

    for (const ev of events) {
      if (ev.start > cursor + 1000) {
        const gapStart = cursor;
        const gapEnd = ev.start;

        const dGapStart = new Date(gapStart);
        const startMin =
          dGapStart.getUTCHours() * 60 +
          dGapStart.getUTCMinutes() +
          dGapStart.getUTCSeconds() / 60;

        const gapMinutes = (gapEnd - gapStart) / 60000;

        gaps.push({
          title: 'Spazio libero',
          start: gapStart,
          end: gapEnd,
          width: gapMinutes,
          offset: startMin,
          conflict: false,
          free: true
        });
      }
      cursor = ev.end;
    }

    // Gap finale fino a 24:00
    if (cursor < fullDayEnd - 1000) {
      const gapStart = cursor;
      const gapEnd = fullDayEnd;

      const dGapStart = new Date(gapStart);
      const startMin =
        dGapStart.getUTCHours() * 60 +
        dGapStart.getUTCMinutes() +
        dGapStart.getUTCSeconds() / 60;

      const gapMinutes = (gapEnd - gapStart) / 60000;

      gaps.push({
        title: 'Spazio libero',
        start: gapStart,
        end: gapEnd,
        width: gapMinutes,
        offset: startMin,
        conflict: false,
        free: true
      });
    }

    this.timeline = [...events, ...gaps].sort((a, b) => a.start - b.start);
  }

  // ----------------------------------------
  // SAVE
  // ----------------------------------------

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

