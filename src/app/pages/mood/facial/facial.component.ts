import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mood-facial',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './facial.component.html',
  styleUrl: './facial.component.scss',
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate(
          '400ms cubic-bezier(.2,.8,.2,1)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class MoodFacialComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoEl') videoRef!: ElementRef<HTMLVideoElement>;

  error = signal<string | null>(null);

  private stream: MediaStream | null = null;

  ngAfterViewInit(): void {
    this.startCamera();
  }

  private async startCamera(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      const video = this.videoRef?.nativeElement;
      if (video && this.stream) {
        video.srcObject = this.stream;
        await video.play();
      }
    } catch (err) {
      this.error.set(
        err instanceof Error ? err.message : 'Não foi possível abrir a câmera.'
      );
    }
  }

  ngOnDestroy(): void {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }
}
