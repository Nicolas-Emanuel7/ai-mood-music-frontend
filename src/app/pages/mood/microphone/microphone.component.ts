import { animate, style, transition, trigger } from '@angular/animations';
import { Component, signal, OnDestroy, inject, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mood-microphone',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './microphone.component.html',
  styleUrl: './microphone.component.scss',
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '500ms cubic-bezier(.2,.8,.2,1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class MoodMicrophoneComponent implements OnDestroy {
  private ngZone = inject(NgZone);
  private router = inject(Router);

  isRecording = signal(false);
  isSending = signal(false);
  volumeScale = signal(0);

  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animationId: number | null = null;
  private chunks: Blob[] = [];

  async toggleRecording(): Promise<void> {
    if (this.isRecording()) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  private async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.chunks = [];

      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.chunks.push(e.data);
      };
      this.mediaRecorder.onstop = () => this.onRecordingStopped();
      this.mediaRecorder.start();

      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.6;
      source.connect(this.analyser);

      this.isRecording.set(true);
      this.volumeScale.set(0);
      this.runVolumeLoop();
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
    }
  }

  private runVolumeLoop(): void {
    if (!this.analyser || !this.isRecording()) return;

    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const normalized = Math.min(1, avg / 70);
    this.ngZone.run(() => this.volumeScale.set(normalized * 0.22));

    this.animationId = requestAnimationFrame(() => this.runVolumeLoop());
  }

  private stopRecording(): void {
    if (this.animationId != null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.volumeScale.set(0);
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    this.isRecording.set(false);
  }

  private onRecordingStopped(): void {
    if (this.chunks.length) {
      const blob = new Blob(this.chunks, { type: 'audio/webm' });
      this.isSending.set(true);
      setTimeout(() => {
        this.router.navigate(['/loading'], {
          state: {
            source: 'microphone',
            audioBlob: blob,
          },
        });
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.stopRecording();
    this.audioContext?.close();
  }
}
