import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mood-text',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class MoodTextComponent {}
