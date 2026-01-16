
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as dashjs from 'dashjs';

@Component({
  selector: 'app-live-player-dash',
  templateUrl: './live-player-dash.component.html',
  styleUrls: ['./live-player-dash.component.scss'],
})
export class LivePlayerDashComponent
  implements AfterViewInit, OnDestroy {

  @ViewChild('video', { static: true })
  videoRef!: ElementRef<HTMLVideoElement>;

  private dash?: dashjs.MediaPlayerClass;

  private readonly DASH_URL =
    'http://localhost:4100/live/dash/index.mpd';

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    // ✅ Browser autoplay policy
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;

    this.dash = dashjs.MediaPlayer().create();

    this.dash.updateSettings({
      streaming: {
        liveCatchup: {
          enabled: true,
          maxDrift: 3,
          playbackRate: {
            min: 0.95,
            max: 1.05,
          },
        },
      },
    });

    this.dash.initialize(video, this.DASH_URL, true);

    console.log('🔵 DASH player avviato');
  }


  ngOnDestroy(): void {
    this.dash?.reset();
  }
}

