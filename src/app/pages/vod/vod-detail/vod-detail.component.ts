
// src/app/pages/vod/vod-detail/vod-detail.component.ts
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import Hls from 'hls.js';
import { VodDetail, VodService } from 'src/app/services/vod.service';

@Component({
  selector: 'app-vod-detail',
  templateUrl: './vod-detail.component.html',
  styleUrls: ['./vod-detail.component.scss'],
})
export class VodDetailComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  vod: VodDetail | null = null;
  isLoading = true;
  error: string | null = null;
  currentSource = '';

  private hls?: Hls;

  constructor(
    private route: ActivatedRoute,
    private vodService: VodService,
    private platform: Platform
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID video non valido.';
      this.isLoading = false;
      return;
    }

    this.vodService.getVodById(id).subscribe({
      next: (data: VodDetail) => {
        this.vod = data;
        this.isLoading = false;

        // piccolo delay per essere sicuri che il <video> sia nel DOM
        setTimeout(() => this.initPlayer(), 0);
      },
      error: (err) => {
        console.error('Errore caricando VOD detail:', err);
        this.error = 'Impossibile caricare il video.';
        this.isLoading = false;
      },
    });
  }

  private initPlayer() {
    if (!this.vod || !this.videoRef) return;

    const video = this.videoRef.nativeElement;
    const hlsUrl = this.vod.hls;

    // iOS / Safari → HLS nativo
    const isIOS =
      this.platform.is('ios') ||
      this.platform.is('iphone') ||
      this.platform.is('ipad');

    const canPlayNativeHls =
      video.canPlayType('application/vnd.apple.mpegurl') !== '';

    if (isIOS || canPlayNativeHls) {
      video.src = hlsUrl;
      video.load();
      this.currentSource = 'HLS (nativo)';
      return;
    }

    // Browser moderni → Hls.js
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(hlsUrl);
      this.hls.attachMedia(video);
      this.currentSource = 'HLS (hls.js)';
      return;
    }

    // Fallback → prova direttamente l’URL HLS
    video.src = hlsUrl;
    video.load();
    this.currentSource = 'HLS (fallback)';
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  }
}

