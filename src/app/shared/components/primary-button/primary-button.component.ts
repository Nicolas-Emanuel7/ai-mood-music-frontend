import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  /** Button label */
  label = input.required<string>();

  /** Router link (if set, renders as link; otherwise as button) */
  routerLink = input<string | null>(null);

  /** Button type when used as button */
  type = input<'button' | 'submit'>('button');

  /** Disabled state */
  disabled = input<boolean>(false);
}
