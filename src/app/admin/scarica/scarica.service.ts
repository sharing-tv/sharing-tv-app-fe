
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScaricaService {
  private mediaRecorder?: MediaRecorder;
  private recordedChunks: BlobPart[] = [];

  async startRecording(): Promise<MediaStream> {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 30, width: 1920, height: 1080 },
      audio: true
    });

    this.recordedChunks = [];
    const mimeType =
      MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' :
      MediaRecorder.isTypeSupported('video/webm;codecs=vp8') ? 'video/webm;codecs=vp8' :
      'video/webm';

    this.mediaRecorder = new MediaRecorder(stream, { mimeType });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) this.recordedChunks.push(e.data);
    };

    this.mediaRecorder.start();
    return stream;
  }

  stopRecording(): void {
    if (!this.mediaRecorder) return;

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const date = new Date().toISOString().replace(/[:.]/g, '-');
      a.href = url;
      a.download = `registrazione-schermo-${date}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    };

    this.mediaRecorder.stop();
  }

  stopStream(stream?: MediaStream): void {
    stream?.getTracks().forEach(t => t.stop());
  }

  /**
   * Cattura un frame del video corrente e lo salva in PNG.
   * Se non è passato un video/stato corrente, effettua una cattura rapida e chiude lo stream.
   */
  async catturaImmagine(videoEl?: HTMLVideoElement, currentStream?: MediaStream): Promise<void> {
    let localStream = currentStream;
    let mustClose = false;

    if (!videoEl && !localStream) {
      // cattura rapida one-shot
      localStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      mustClose = true;
    }

    // se abbiamo il video, usiamo le sue dimensioni reali
    const video = videoEl ?? Object.assign(document.createElement('video'), {
      srcObject: localStream as MediaStream,
      muted: true,
      playsInline: true
    });

    if (video.paused || video.readyState < 2) {
      await video.play().catch(() => {});
      await new Promise(r => setTimeout(r, 100)); // piccolo delay per avere frame pronto
    }

    const width = (video as HTMLVideoElement).videoWidth || 1920;
    const height = (video as HTMLVideoElement).videoHeight || 1080;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context non disponibile');
    ctx.drawImage(video, 0, 0, width, height);

    const blob: Blob = await new Promise((resolve) => canvas.toBlob(b => resolve(b as Blob), 'image/png'));
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `screenshot-schermo-${date}.png`;
    a.click();
    URL.revokeObjectURL(url);

    if (mustClose && localStream) {
      this.stopStream(localStream);
    }
  }
}

