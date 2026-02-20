import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class LoadingComponent implements OnInit, OnDestroy {
  messages = [
    'Analisando seu momento…',
    'Entendendo sua energia…',
    'Traduzindo sentimento em som…',
  ];

  currentMessage = this.messages[0];

  private currentIndex = 0;
  private messageIntervalId: number | null = null;
  private apiTimeoutId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startMessageRotation();
    this.scheduleApiCall();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private startMessageRotation(): void {
    this.messageIntervalId = window.setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[this.currentIndex];
    }, 1200);
  }

  private scheduleApiCall(): void {
    this.apiTimeoutId = window.setTimeout(() => {
      this.handleApiResponse();
    }, 3000);
  }

  private handleApiResponse(): void {
    this.clearTimers();

    this.router.navigate(['/result'], {
      state: {
        playlist: history.state?.playlist ?? null,
      },
    });
  }

  private clearTimers(): void {
    if (this.messageIntervalId != null) {
      window.clearInterval(this.messageIntervalId);
      this.messageIntervalId = null;
    }

    if (this.apiTimeoutId != null) {
      window.clearTimeout(this.apiTimeoutId);
      this.apiTimeoutId = null;
    }
  }
}
