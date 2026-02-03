import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { PaginationDotsComponent } from '../../../shared/components/pagination-dots/pagination-dots.component';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [RouterLink, PrimaryButtonComponent, PaginationDotsComponent],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {}
