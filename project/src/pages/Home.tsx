import React from 'react';
import { useQuery } from 'react-query';
import { Play, TrendingUp } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { fetchTrending } from '../services/tmdb';

export default function Home() {
  const { data: trendingMovies } = useQuery('trending', fetchTrending);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
          alt="Hero Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="container mx-auto flex h-full items-center px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold">Welcome to MovieStream</h1>
              <p className="mt-4 text-xl text-gray-300">
                Watch unlimited movies, TV shows, and more. Start streaming today.
              </p>
              <button className="mt-8 flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-semibold transition-colors hover:bg-red-700">
                <Play className="h-5 w-5" />
                Start Watching
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}