import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { fetchMovieDetails } from '../../services/tmdb';
import LoadingSpinner from '../../components/LoadingSpinner';

interface VideoSource {
  quality: string;
  url: string;
  type: 'mp4' | 'webm' | 'hls';
}

interface MovieWithSources {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  poster_path: string | null;
  sources: VideoSource[];
  featured: boolean;
  active: boolean;
}

// Popular movie IDs from TMDB that are guaranteed to exist
const SAMPLE_MOVIE_IDS = [
  238, // The Godfather
  424, // Schindler's List
  557, // Spider-Man
  155, // The Dark Knight
];

export default function MovieManagement() {
  const [selectedMovie, setSelectedMovie] = useState<MovieWithSources | null>(null);

  const { data: movies, isLoading, error } = useQuery<MovieWithSources[]>(
    'admin-movies',
    async () => {
      const fetchedMovies = await Promise.all(
        SAMPLE_MOVIE_IDS.map(async (id) => {
          try {
            const movie = await fetchMovieDetails(id);
            if (!movie) {
              throw new Error(`Movie not found: ${id}`);
            }
            return {
              id: movie.id,
              tmdbId: movie.id,
              title: movie.title,
              overview: movie.overview,
              poster_path: movie.poster_path,
              sources: [
                {
                  quality: '1080p',
                  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
                  type: 'hls'
                }
              ],
              featured: false,
              active: true,
            };
          } catch (err) {
            console.error(`Error fetching movie ${id}:`, err);
            return null;
          }
        })
      );

      return fetchedMovies.filter((movie): movie is MovieWithSources => movie !== null);
    },
    {
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
      retry: 2,
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movies?.length) {
    return (
      <div className="rounded-lg bg-red-500/10 p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-red-500">Error Loading Movies</h3>
        <p className="text-gray-400">Unable to load movie data. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Movie Management</h2>
        <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700">
          <Plus className="h-5 w-5" />
          Add Movie
        </button>
      </div>

      <div className="rounded-lg bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700 text-sm">
              <tr>
                <th className="px-6 py-4">Movie</th>
                <th className="px-6 py-4">Sources</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="h-16 w-12 rounded object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{movie.title}</h3>
                        <p className="mt-1 text-sm text-gray-400 line-clamp-1">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-500">
                      {movie.sources?.length || 0} sources
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      movie.active ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {movie.active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={movie.featured}
                        className="peer sr-only"
                        onChange={() => {}}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="rounded-lg p-2 hover:bg-gray-600"
                        title="Upload video sources"
                      >
                        <Upload className="h-4 w-4" />
                      </button>
                      <button 
                        className="rounded-lg p-2 hover:bg-gray-600"
                        title="Edit movie details"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="rounded-lg p-2 hover:bg-gray-600"
                        title="Delete movie"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}