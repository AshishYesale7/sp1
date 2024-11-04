export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: 'movie' | 'tv';
}

export interface Genre {
  id: number;
  name: string;
}

export interface VideoSource {
  id: string;
  quality: string;
  url: string;
  type: 'mp4' | 'webm' | 'hls';
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  plan: 'free' | 'premium';
  watchlist: number[];
  settings: {
    wifiOnly: boolean;
    notifications: boolean;
    autoPlay: boolean;
  };
}