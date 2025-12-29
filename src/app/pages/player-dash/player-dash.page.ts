
// src/app/pages/player-dash/player-dash.page.ts

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as dashjs from 'dashjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-dash',
  templateUrl: './player-dash.page.html',
  styleUrls: ['./player-dash.page.scss'],
})
export class PlayerDashPage implements OnInit, OnDestroy {

  @ViewChild('video', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  player!: dashjs.MediaPlayerClass;
  currentClock = '--:--:--';

  private readonly dashUrl =
    `${environment.streamBaseUrl}/live-stream/dash.mpd`;

  ngOnInit() {
    setInterval(() => {
      this.currentClock = new Date().toLocaleTimeString('it-IT', { hour12: false });
    }, 1000);
  }

  ngAfterViewInit() {
    this.initPlayer();
  }

  initPlayer() {
    const video = this.videoRef.nativeElement;

    this.player = dashjs.MediaPlayer().create();
    this.player.updateSettings({
      streaming: {
        xhrWithCredentials: false,
      },
    } as any);
    this.player.initialize(video, this.dashUrl, true as any);

  }

  toggleMute() {
    this.videoRef.nativeElement.muted = !this.videoRef.nativeElement.muted;
  }

  async full() {
    await this.videoRef.nativeElement.requestFullscreen();
  }

  ngOnDestroy() {
    this.player?.reset();
  }
}

