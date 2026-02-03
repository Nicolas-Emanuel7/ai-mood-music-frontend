import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-pagination-dots',
  standalone: true,
  templateUrl: './pagination-dots.component.html',
  styleUrl: './pagination-dots.component.scss',
})
export class PaginationDotsComponent {
  /** Total number of steps */
  total = input.required<number>();

  /** Current step (0-based) */
  current = input.required<number>();

  protected items = computed(() =>
    Array.from({ length: this.total() }, (_, i) => i)
  );
}
