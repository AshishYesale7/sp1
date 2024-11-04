import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { fetchMovieDetails } from '../../services/tmdb';

interface VideoSource {
  quality: string;
  url: string;
  type: 'mp4' | 'webm' | 'hls';
}

interface MovieWithSources {
  id: number;
  tmdbId: number;
  title: string;
  sources: VideoSource[];
  featured: boolean;
  active: boolean;
}

export default function MovieManagement() {
  const [selectedMovie, setSelectedMovie] = useState<MovieWithSources | null>(null);

  const { data: movies } = useQuery<MovieWithSources[]>('admin-movies', 
    () => fetchMovieDetails(28) // Replace with actual admin movie fetch
  );

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
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Sources</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {movies?.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4">{movie.title}</td>
                  <td className="px-6 py-4">
                    {movie.sources?.length || 0} sources
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      movie.active ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {movie.active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={movie.featured}
                      className="h-4 w-4 rounded border-gray-600 bg-gray-700"
                      onChange={() => {}}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 hover:bg-gray-600">
                        <Upload className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-gray-600">
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