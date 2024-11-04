import axios, { AxiosError } from 'axios';
import type { Movie } from '../types/movie';

const TMDB_API_KEY = 'a30eb197f4d14ce9710480a821288f6c';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchTrending = async (): Promise<Movie[]> => {
  try {
    const { data } = await tmdbApi.get('/trending/movie/day');
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const fetchMovieDetails = async (id: number): Promise<Movie | null> => {
  try {
    const { data } = await tmdbApi.get(`/movie/${id}`);
    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      release_date: data.release_date,
      vote_average: data.vote_average,
      genre_ids: data.genres?.map((g: { id: number }) => g.id) || [],
      media_type: 'movie',
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        console.error('Movie not found:', id);
        return null;
      }
      console.error('API Error:', error.response?.data?.status_message || error.message);
    } else {
      console.error('Error fetching movie details:', error instanceof Error ? error.message : 'Unknown error');
    }
    return null;
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const { data } = await tmdbApi.get('/search/movie', {
      params: { query },
    });
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const { data } = await tmdbApi.get('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const fetchMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const { data } = await tmdbApi.get('/discover/movie', {
      params: { with_genres: genreId },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};