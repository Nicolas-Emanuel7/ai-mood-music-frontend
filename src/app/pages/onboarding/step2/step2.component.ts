import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { PaginationDotsComponent } from '../../../shared/components/pagination-dots/pagination-dots.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [RouterLink, PrimaryButtonComponent, PaginationDotsComponent],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        query(
          '.animate-item',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(120, [
              animate(
                '500ms cubic-bezier(.2,.8,.2,1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class Step2Component {}
