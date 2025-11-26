
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScaricaService } from './scarica.service';

@Component({
  selector: 'app-scarica',
  templateUrl: './scarica.component.html',
  styleUrls: ['./scarica.component.scss']
})
export class ScaricaComponent {
  @ViewChild('preview', { static: false }) previewRef?: ElementRef<HTMLVideoElement>;
  private currentStream?: MediaStream;
  isRecording = false;

  constructor(private scaricaService: ScaricaService) {}

  async start() {
    this.currentStream = await this.scaricaService.startRecording();
    const video = this.previewRef?.nativeElement;
    if (video) video.srcObject = this.currentStream;
    this.isRecording = true;
  }

  stop() {
    this.scaricaService.stopRecording();
    this.scaricaService.stopStream(this.currentStream);
    this.isRecording = false;
    const video = this.previewRef?.nativeElement;
    if (video) video.srcObject = null;
  }

  async captureImage() {
    const video = this.previewRef?.nativeElement;
    await this.scaricaService.catturaImmagine(video, this.currentStream);
  }
}


