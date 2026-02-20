import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import type {
  PlaylistResult,
  Track,
} from '../../core/models/playlist-result.model';

const MOCK_PLAYLIST: PlaylistResult = {
  icon: '😄',
  name: 'Nome da Playlist',
  description:
    'Descrição da playlist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  tracks: [
    {
      id: '1',
      title: 'Nome da música',
      artist: 'Nome do artista',
      albumArtUrl: 'https://picsum.photos/seed/1/200/200',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      spotifyUrl: 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp',
    },
    {
      id: '2',
      title: 'Nome da música 2 e tal',
      artist: 'Nome do artista',
      albumArtUrl: 'https://picsum.photos/seed/2/200/200',
      youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      spotifyUrl: 'https://open.spotify.com/track/2Vq6x9V2d3T5tUkiOHIeUk',
    },
    {
      id: '3',
      title: 'Nome da música',
      artist: 'Outro artista',
      albumArtUrl: 'https://picsum.photos/seed/3/200/200',
      youtubeUrl: 'https://www.youtube.com/watch?v=kXYiU_JCYtU',
      spotifyUrl: 'https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh',
    },
    {
      id: '4',
      title: 'Nome da música',
      artist: 'Nome do artista',
      albumArtUrl: 'https://picsum.photos/seed/4/200/200',
      youtubeUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
      spotifyUrl: 'https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas',
    },
    {
      id: '5',
      title: 'Nome da música',
      artist: 'Artista famoso',
      albumArtUrl: 'https://picsum.photos/seed/5/200/200',
      youtubeUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
      spotifyUrl: 'https://open.spotify.com/track/6u7jPi22kF8CTH3EX82b43',
    },
  ],
};

const DESCRIPTION_TRUNCATE_LENGTH = 80;

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        query(
          '.animate-item',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(120, [
              animate(
                '450ms cubic-bezier(.2,.8,.2,1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ResultComponent implements OnInit {
  private router = inject(Router);

  loaded = signal(false);
  playlist = signal<PlaylistResult | null>(null);

  showDescriptionModal = signal(false);
  selectedTrack = signal<Track | null>(null);

  showVerMais = computed(() => {
    const p = this.playlist();
    return (p?.description?.length ?? 0) > DESCRIPTION_TRUNCATE_LENGTH;
  });

  energyLevel = computed(() => this.playlist()?.energyLevel);

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const playlistFromState = navigation?.extras?.state?.['playlist'] as
      | PlaylistResult
      | undefined;

    if (playlistFromState) {
      this.playlist.set(playlistFromState);
      this.loaded.set(true);
      return;
    }

    setTimeout(() => {
      this.playlist.set({
        ...MOCK_PLAYLIST,
        energyLevel: MOCK_PLAYLIST.energyLevel ?? 'medium',
      });
      this.loaded.set(true);
    }, 1200);
  }

  openDescriptionModal(): void {
    this.showDescriptionModal.set(true);
  }

  closeDescriptionModal(): void {
    this.showDescriptionModal.set(false);
  }

  openTrackModal(track: Track): void {
    this.selectedTrack.set(track);
  }

  closeTrackModal(): void {
    this.selectedTrack.set(null);
  }
}
