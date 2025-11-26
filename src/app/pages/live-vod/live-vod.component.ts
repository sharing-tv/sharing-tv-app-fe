import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import Hls from 'hls.js';
import { LiveService, VodChannelNextItem, VodChannelNowPlaying, VodChannelResponse } from 'src/app/services/live.service';

@Component({
  selector: 'app-live-vod',
  templateUrl: './live-vod.component.html',
  styleUrls: ['./live-vod.component.scss'],
})
export class LiveVodComponent  implements OnInit, OnDestroy {

  @ViewChild('videoPlayer', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  isLoading = true;
  error: string | null = null;

  nowPlaying: VodChannelNowPlaying | null = null;
  nextItems: VodChannelNextItem[] = [];
  currentSource = '';

  private hls?: Hls;

  constructor(
    private liveService: LiveService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.loadChannel();
  }

  private loadChannel() {
    this.isLoading = true;
    this.error = null;

    this.liveService.getVodChannel().subscribe({
      next: (data: VodChannelResponse) => {
        this.nowPlaying = data.nowPlaying;
        this.nextItems = data.next;

        this.isLoading = false;

        setTimeout(() => this.initPlayer(), 0);
      },
      error: (err) => {
        console.error('Errore caricando canale VOD:', err);
        this.error = 'Impossibile caricare il canale VOD.';
        this.isLoading = false;
      }
    });
  }

  private initPlayer() {
    if (!this.nowPlaying || !this.videoRef) return;

    const video = this.videoRef.nativeElement;
    const hlsUrl = this.nowPlaying.hls;
    const startPos = this.nowPlaying.position || 0;

    const isIOS =
      this.platform.is('ios') ||
      this.platform.is('iphone') ||
      this.platform.is('ipad');

    const canPlayNativeHls =
      video.canPlayType('application/vnd.apple.mpegurl') !== '';

    if (isIOS || canPlayNativeHls) {
      video.src = hlsUrl;
      video.load();
      video.currentTime = startPos;
      video.play();
      this.currentSource = 'HLS (nativo)';
      return;
    }

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(hlsUrl);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = startPos;
        video.play();
      });

      this.currentSource = 'HLS (hls.js)';
      return;
    }

    // fallback
    video.src = hlsUrl;
    video.load();
    video.currentTime = startPos;
    video.play();
    this.currentSource = 'HLS (fallback)';
  }

  doRefresh(ev: any) {
    this.destroyPlayer();
    this.loadChannel();
    setTimeout(() => ev.target.complete(), 500);
  }

  private destroyPlayer() {
    if (this.hls) {
      this.hls.destroy();
      this.hls = undefined;
    }
    if (this.videoRef) {
      const video = this.videoRef.nativeElement;
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }

  ngOnDestroy() {
    this.destroyPlayer();
  }
}
