import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { PaginationDotsComponent } from '../../../shared/components/pagination-dots/pagination-dots.component';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [PrimaryButtonComponent, PaginationDotsComponent],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component {}
