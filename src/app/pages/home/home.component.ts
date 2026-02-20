import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('contentEnter', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 1.8s cubic-bezier(.2,.8,.2,1)', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {}
