import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { EnhancedVideoPlayer } from '../components/EnhancedVideoPlayer';
import { fetchMovieDetails } from '../services/tmdb';
import type { Movie } from '../types/movie';

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: movie, isLoading, isError } = useQuery<Movie | null>(
    ['movie', id],
    () => fetchMovieDetails(Number(id)),
    {
      retry: 2,
      suspense: false,
      useErrorBoundary: false,
      staleTime: 300000,
      cacheTime: 600000,
    }
  );

  // Example video sources - in production, these would come from your backend
  const videoSources = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      label: '1080p',
    },
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      label: '720p',
    },
  ];

  const handleNext = () => {
    // Handle next video logic
    console.log('Playing next video');
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black pt-16">
        <div className="container mx-auto flex items-center justify-center px-4 py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
        </div>
      </main>
    );
  }

  if (isError || !movie) {
    return (
      <main className="min-h-screen bg-black pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-red-600" />
            <h2 className="mb-2 text-xl font-bold">Error Loading Movie</h2>
            <p className="mb-4 text-gray-400">Unable to load movie details. Please try again later.</p>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold transition-colors hover:bg-red-700"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-4">
        <Suspense fallback={<div>Loading player...</div>}>
          <EnhancedVideoPlayer
            sources={videoSources}
            poster={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : undefined}
            onNext={handleNext}
          />
        </Suspense>
        
        <div className="mt-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 transition-colors hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
          </div>
          
          <p className="mt-4 text-gray-300">{movie.overview}</p>
          
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-red-600 px-3 py-1 text-sm">
              {movie.vote_average.toFixed(1)} Rating
            </span>
            <span className="text-sm text-gray-400">
              Released: {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}