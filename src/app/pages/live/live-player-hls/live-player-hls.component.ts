
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-live-player-hls',
  templateUrl: './live-player-hls.component.html',
  styleUrls: ['./live-player-hls.component.scss'],
})
export class LivePlayerHlsComponent
  implements AfterViewInit, OnDestroy {

  @ViewChild('video', { static: true })
  videoRef!: ElementRef<HTMLVideoElement>;

  private hls?: Hls;

  private readonly HLS_URL =
    'http://localhost:4100/live/hls/index.m3u8';

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

      // ✅ POLICY BROWSER
      video.muted = true;
      video.autoplay = true;

    // 🍏 Safari / iOS
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.HLS_URL;
      video.play();
      return;
    }

    // 🌐 hls.js
    if (Hls.isSupported()) {
      this.hls = new Hls({
        lowLatencyMode: true,
        backBufferLength: 30,
      });

      this.hls.loadSource(this.HLS_URL);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
        console.log('🟢 HLS player avviato');
      });
    }
  }

  ngOnDestroy(): void {
    this.hls?.destroy();
  }
}

