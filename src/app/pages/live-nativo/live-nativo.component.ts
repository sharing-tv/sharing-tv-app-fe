// src/app/pages/live-nativo/live-nativo.component.ts
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-live-nativo',
  templateUrl: './live-nativo.component.html',
  styleUrls: ['./live-nativo.component.scss']
})
export class LiveNativoComponent implements OnDestroy {
  private pc?: RTCPeerConnection;
  private stream?: MediaStream;
  isStreaming = false;

  // ✅ Endpoint WHIP del tuo OME
  private whipEndpoint = 'http://128.140.48.50:3333/live'; // <-- puoi spostarlo in env se vuoi

  async startBroadcast() {
    try {
      this.isStreaming = true;

      // 🎥 Ottieni flusso da webcam + microfono
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      const preview = document.getElementById('preview') as HTMLVideoElement;
      if (preview) {
        preview.srcObject = this.stream;
      }

      // 🔗 Crea connessione WebRTC
      this.pc = new RTCPeerConnection();
      this.stream.getTracks().forEach(track => this.pc?.addTrack(track, this.stream!));

      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // 📡 Invia SDP all’endpoint WHIP di OME
      const response = await fetch(this.whipEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/sdp' },
        body: offer.sdp
      });

      const answerSDP = await response.text();
      await this.pc.setRemoteDescription({ type: 'answer', sdp: answerSDP });

      console.log('✅ Diretta avviata via WHIP');
    } catch (err) {
      console.error('❌ Errore durante l’avvio della diretta:', err);
      this.isStreaming = false;
    }
  }

  async stopBroadcast() {
    try {
      // 🔇 Ferma tutti i track
      this.stream?.getTracks().forEach(track => track.stop());
      this.stream = undefined;

      // 🔌 Chiudi la connessione
      await this.pc?.close();
      this.pc = undefined;

      this.isStreaming = false;
      console.log('🛑 Trasmissione terminata');
    } catch (err) {
      console.error('Errore nello stop:', err);
    }
  }

  ngOnDestroy(): void {
    this.stopBroadcast();
  }
}

