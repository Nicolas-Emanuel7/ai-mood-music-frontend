import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mood-text',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
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
export class MoodTextComponent implements AfterViewInit, OnDestroy {
  @ViewChild('textInput') textInputRef!: ElementRef<HTMLTextAreaElement>;

  text = '';
  placeholders = [
    'Como você está se sentindo?',
    'O que aconteceu hoje?',
    'Descreva o momento...',
    'Se pudesse resumir em uma frase...',
    'O que está passando pela sua cabeça?',
  ];
  currentPlaceholder = this.placeholders[0];
  private placeholderIntervalId: number | null = null;

  ngAfterViewInit(): void {
    setTimeout(() => this.textInputRef?.nativeElement?.focus(), 100);
    this.placeholderIntervalId = window.setInterval(() => {
      if (!this.text) {
        const random =
          this.placeholders[
            Math.floor(Math.random() * this.placeholders.length)
          ];
        this.currentPlaceholder = random;
      }
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.placeholderIntervalId) {
      clearInterval(this.placeholderIntervalId);
      this.placeholderIntervalId = null;
    }
  }
}
