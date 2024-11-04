import React from 'react';
import { TrendingUp } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { useQuery } from 'react-query';
import { fetchTrending } from '../services/tmdb';
import LoadingSpinner from './LoadingSpinner';

export default function TrendingSection() {
  const { data: trendingMovies, isLoading } = useQuery('trending', fetchTrending, {
    staleTime: 300000, // 5 minutes
    cacheTime: 600000, // 10 minutes
    retry: 3,
  });

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-red-600" />
        <h2 className="text-2xl font-bold">Trending Now</h2>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}