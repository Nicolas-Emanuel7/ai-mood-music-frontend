export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
}

export interface PlaylistResult {
  icon: string;
  name: string;
  description: string;
  tracks: Track[];
}
