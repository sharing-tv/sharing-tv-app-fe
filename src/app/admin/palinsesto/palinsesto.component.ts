
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
  startTime: string | null;    // HH:MM:SS
  endTime?: string | null;     // HH:MM:SS
  title: string;
  bunnyId: string;
  length: number;
  conflict?: boolean;
  editing?: boolean;

  // nuovi campi editor
  editHour?: number;
  editMinute?: number;
  editSecond?: number;
}

@Component({
  selector: 'app-palinsesto',
  templateUrl: './palinsesto.component.html',
  styleUrls: ['./palinsesto.component.scss'],
})
export class PalinsestoComponent implements OnInit {

  
  private parseLength(len: any): number {
    if (!len) return 0;

    if (typeof len === "number") {
      return len; // ora è già in ms dal backend
    }

    if (typeof len === "string" && len.includes(":")) {
      const [h, m, s] = len.split(":").map(Number);
      return (h * 3600 + m * 60 + s) * 1000;
    }

    return 0;
  }

  loading = false;
  saving = false;
  error: string | null = null;

  vodList: VodListItem[] = [];
  channelSlug = 'vod-channel-1';
  loop = true;

  items: PalinsestoItem[] = [];

  timeline: {
    title: string;
    start: string;
    end: string;
    width: number;
    offset: number;
    conflict: boolean;
  }[] = [];

    colors = [
    '#4e79a7',
    '#f28e2b',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#af7aa1',
    '#ff9da7',
    '#9c755f',
    '#bab0ab'
  ];


  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);
  seconds = Array.from({ length: 60 }, (_, i) => i);

  constructor(
    private palinsestoService: PalinsestoService,
    private toastCtrl: ToastController
  ) {}
  

  ngOnInit() {
    this.loadData();
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

            this.items = ch.items.map((it) => {
              const match = vods.find(v => v.id === it.vod);

              let h = 0, m = 0, s = 0;
              if (it.startTime) {
                [h, m, s] = it.startTime.split(':').map(Number);
              }

              return {
                vod: it.vod,
                startTime: it.startTime || null,
                endTime: null,
                title: match ? match.title : `(missing) ${it.vod}`,
                bunnyId: match ? match.bunnyId : '',
                length: this.parseLength(match?.length),
                conflict: false,
                editing: false,

                editHour: h,
                editMinute: m,
                editSecond: s
              };
            });

            this.recalculateTimes();
            this.loading = false;
          },
          error: () => {
            this.error = 'Errore caricando il canale (palinsesto).';
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

  drop(event: CdkDragDrop<PalinsestoItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.recalculateTimes();
  }

  addVod(v: VodListItem) {
    this.items.push({
      vod: v.id,
      startTime: null,
      endTime: null,
      title: v.title,
      bunnyId: v.bunnyId,
      length: this.parseLength(v.length),
      conflict: false,
      editing: false,
      editHour: 0,
      editMinute: 0,
      editSecond: 0
    });

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

  formatDuration(ms: number): string {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // SALVA ORARIO SELEZIONATO
  saveStartTime(item: PalinsestoItem) {
    const hh = item.editHour!.toString().padStart(2, '0');
    const mm = item.editMinute!.toString().padStart(2, '0');
    const ss = item.editSecond!.toString().padStart(2, '0');

    item.startTime = `${hh}:${mm}:${ss}`;
    item.editing = false;

    this.recalculateTimes();
  }

  // Calcolo fine video + conflitti + timeline
  recalculateTimes() {
    let lastEnd: string | null = null;

    this.items.sort((a, b) => {
      if (!a.startTime) return 1;
      if (!b.startTime) return -1;
      return a.startTime.localeCompare(b.startTime);
    });

    for (let item of this.items) {
      item.conflict = false;

      if (!item.startTime) continue;

      const [h, m, s] = item.startTime.split(':').map(Number);
      const startMs = h * 3600000 + m * 60000 + s * 1000;
      const endMs = startMs + item.length;

      const endH = Math.floor(endMs / 3600000);
      const endM = Math.floor((endMs % 3600000) / 60000);
      const endS = Math.floor((endMs % 60000) / 1000);

      item.endTime = `${endH.toString().padStart(2, '0')}:${endM
        .toString()
        .padStart(2, '0')}:${endS.toString().padStart(2, '0')}`;

      if (lastEnd && item.startTime < lastEnd) item.conflict = true;

      lastEnd = item.endTime;
    }

    this.generateTimeline();
  }

  generateTimeline() {
    this.timeline = [];

    for (const item of this.items) {
      if (!item.startTime || !item.endTime) continue;

      const [sh, sm, ss] = item.startTime.split(':').map(Number);
      const [eh, em, es] = item.endTime.split(':').map(Number);

      const startMin = sh * 60 + sm + ss / 60;
      const endMin = eh * 60 + em + es / 60;
      const durMin = endMin - startMin;

      this.timeline.push({
        title: item.title,
        start: item.startTime,
        end: item.endTime,
        width: durMin,      // px
        offset: startMin,   // px
        conflict: item.conflict ?? false
      });
    }
  }


  async save() {
    this.saving = true;

    const payloadItems: ChannelItem[] = this.items.map(it => ({
      vod: it.vod,
      startTime: it.startTime
    }));

    this.palinsestoService.saveChannel(this.channelSlug, payloadItems, this.loop)
      .subscribe({
        next: async () => {
          this.saving = false;
          this.generateTimeline();
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
            message: 'Errore durante il salvataggio',
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

