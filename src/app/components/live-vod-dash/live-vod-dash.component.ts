
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as dashjs from 'dashjs';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-live-vod-dash',
  templateUrl: './live-vod-dash.component.html',
  styleUrls: ['./live-vod-dash.component.scss'],
})
export class LiveVodDashComponent implements OnInit, OnDestroy {

  @ViewChild('tvPlayer', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  player: dashjs.MediaPlayerClass | null = null;

  nowPlaying: any = null;

  refreshTimer: any;
  monitorTimer: any;
  clockTimer: any;

  currentClock = "--:--:--";
  isMuted = false;
  currentTime = 0;
  duration = 0;
  progressPercent = 0;

  qualities: number[] = [];
  currentQuality: number | 'auto' = 'auto';

  constructor(private live: LiveService) {}

  ngOnInit() {
    this.load();

    this.refreshTimer = setInterval(() => this.load(), 60000);

    this.clockTimer = setInterval(() => {
      const d = new Date();
      this.currentClock = 
        d.getHours().toString().padStart(2, '0') + ':' +
        d.getMinutes().toString().padStart(2, '0') + ':' +
        d.getSeconds().toString().padStart(2, '0');
    }, 1000);
  }

  load(auto = false) {
    this.live.getVodChannel().subscribe({
      next: (data) => {
        if (!data.nowPlaying) return;

        const newId = data.nowPlaying.id;

        if (auto && this.nowPlaying?.id === newId) return;

        this.nowPlaying = data.nowPlaying;
        setTimeout(() => this.initPlayer(), 0);
      }
    });
  }

  initPlayer() {
    if (!this.videoRef) return;

    const video = this.videoRef.nativeElement;
    const dashUrl = this.nowPlaying.dash;

    this.destroyPlayer();

    this.player = dashjs.MediaPlayer().create();

    // ABR attivo
    this.player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: {
            video: true,
            audio: true
          }
        }
      }
    });

    this.player.initialize(video, dashUrl, true);

    if (this.nowPlaying.position > 0)
      this.player.seek(this.nowPlaying.position);

    this.player.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
      this.duration = video.duration;
    });

    this.player.on(dashjs.MediaPlayer.events.PLAYBACK_TIME_UPDATED, () => {
      this.currentTime = video.currentTime;
      this.progressPercent = (video.currentTime / video.duration) * 100;
    });

    // Recupero qualità (API dash.js 4.x)
    this.player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      //  workaround per TS
      const p: any = this.player;

      const bitrates = p.getBitrateInfoListFor('video');
      if (bitrates) {
        this.qualities = bitrates.map((b: { bitrate: number }, i: number) => i);
      }
    });

    this.startMonitor();
  }

  setQuality(q: number | 'auto') {
    if (!this.player) return;

    const p: any = this.player; // forza compatibilità dash.js 4.x

    if (q === 'auto') {
      this.player.updateSettings({
        streaming: { abr: { 
          autoSwitchBitrate: { video: true, audio: true }
        } }
      });
      this.currentQuality = 'auto';
      return;
    }

    // disabilita ABR
    this.player.updateSettings({
      streaming: { abr: { 
        autoSwitchBitrate: { video: false, audio: false }
      } }
    });

    p.setQualityFor('video', q);

    this.currentQuality = q;
  }

  startMonitor() {
    if (this.monitorTimer) clearInterval(this.monitorTimer);

    this.monitorTimer = setInterval(() => {
      if (!this.player) return;

      const video = this.videoRef.nativeElement;

      if (video.duration > 0 && (video.duration - video.currentTime) < 0.4) {
        this.load(true);
      }

    }, 500);
  }

  toggleMute() {
    const v = this.videoRef.nativeElement;
    this.isMuted = !this.isMuted;
    v.muted = this.isMuted;
  }

  async toggleFullScreen() {
    const container = document.querySelector('.tv-player-container') as HTMLElement;
    if (!document.fullscreenElement)
      await container.requestFullscreen();
    else
      await document.exitFullscreen();
  }

  ngOnDestroy() {
    this.destroyPlayer();
    clearInterval(this.refreshTimer);
    clearInterval(this.monitorTimer);
    clearInterval(this.clockTimer);
  }

  destroyPlayer() {
    if (this.player) {
      this.player.reset();
      this.player = null;
    }
  }
}

