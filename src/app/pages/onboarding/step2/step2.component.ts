import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { PaginationDotsComponent } from '../../../shared/components/pagination-dots/pagination-dots.component';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [RouterLink, PrimaryButtonComponent, PaginationDotsComponent],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {}
