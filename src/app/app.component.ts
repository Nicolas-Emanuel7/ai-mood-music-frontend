import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ai-mood-music';
  private router = inject(Router);

  showSharedBackground = signal(this.isSharedBackgroundRoute(this.router.url));

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.showSharedBackground.set(
          this.isSharedBackgroundRoute(event.urlAfterRedirects)
        );
      });
  }

  private isSharedBackgroundRoute(url: string): boolean {
    return url.startsWith('/home') || url.startsWith('/mood/');
  }
}
