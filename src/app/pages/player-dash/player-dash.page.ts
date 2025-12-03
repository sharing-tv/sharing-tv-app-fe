
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as dashjs from 'dashjs';

@Component({
  selector: 'app-player-dash',
  templateUrl: './player-dash.page.html',
  styleUrls: ['./player-dash.page.scss'],
})
export class PlayerDashPage implements OnInit, OnDestroy {

  @ViewChild('video', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  player: any;
  currentClock = "--:--:--";
  qualities: number[] = [];
  currentQuality: number | "auto" = "auto";

  ngOnInit() {
    setInterval(() => {
      const d = new Date();
      this.currentClock = d.toLocaleTimeString('it-IT', { hour12: false });
    }, 1000);
  }

  ngAfterViewInit() {
    this.initPlayer();
  }

  initPlayer() {
    const video = this.videoRef.nativeElement;
    const dashUrl = "https://www.sharingtveuropa.it/live.mpd";

    this.player = dashjs.MediaPlayer().create();
    this.player.initialize(video, dashUrl, true);

    this.player.updateSettings({
      streaming: { abr: { autoSwitchBitrate: true } }
    });

    this.player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      const list: dashjs.BitrateInfo[] = this.player.getBitrateInfoListFor('video');

      this.qualities = list.map((_: dashjs.BitrateInfo, i: number) => i);
    });

  }

  onQualityChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.setQuality(value === "auto" ? "auto" : Number(value));
  }

  setQuality(q: number | "auto") {
    if (q === "auto") {
      this.player.updateSettings({ streaming: { abr: { autoSwitchBitrate: true } } });
      this.currentQuality = "auto";
      return;
    }

    this.player.updateSettings({ streaming: { abr: { autoSwitchBitrate: false } } });
    this.player.setQualityFor("video", q);
    this.currentQuality = q;
  }

  toggleMute() {
    this.videoRef.nativeElement.muted = !this.videoRef.nativeElement.muted;
  }

  async full() {
    await this.videoRef.nativeElement.requestFullscreen();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.reset();
      this.player = null;
    }
  }
}

