import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mood-microphone',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './microphone.component.html',
  styleUrl: './microphone.component.scss',
})
export class MoodMicrophoneComponent {}
