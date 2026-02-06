import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mood-text',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class MoodTextComponent implements AfterViewInit {
  @ViewChild('textInput') textInputRef!: ElementRef<HTMLTextAreaElement>;

  text = '';

  ngAfterViewInit(): void {
    setTimeout(() => this.textInputRef?.nativeElement?.focus(), 100);
  }
}
