import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Filter } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { fetchGenres, fetchMoviesByGenre } from '../services/tmdb';

export default function Browse() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  
  const { data: genres = [], isLoading: isLoadingGenres } = useQuery(
    'genres',
    fetchGenres,
    {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes
      retry: 2,
    }
  );

  const { data: movies = [], isLoading: isLoadingMovies } = useQuery(
    ['moviesByGenre', selectedGenre],
    () => fetchMoviesByGenre(selectedGenre || 28),
    {
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
      retry: 2,
      enabled: true,
    }
  );

  if (isLoadingGenres || isLoadingMovies) {
    return (
      <div className="container mx-auto min-h-screen px-4 pt-24">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 pt-24">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Browse Movies</h1>
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5" />
          <select
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm"
            onChange={(e) => setSelectedGenre(Number(e.target.value) || null)}
            value={selectedGenre || ''}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="rounded-lg bg-gray-800 p-8 text-center">
          <p className="text-lg text-gray-400">No movies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}