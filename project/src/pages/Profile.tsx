import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { MovieCard } from '../components/MovieCard';
import { useQuery } from 'react-query';
import { fetchMovieDetails } from '../services/tmdb';

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { data: watchlistMovies } = useQuery(
    ['watchlist', user?.watchlist],
    () => Promise.all(user?.watchlist.map(id => fetchMovieDetails(id)) || []),
    { enabled: !!user?.watchlist.length }
  );

  if (!user) {
    return (
      <main className="container mx-auto min-h-screen px-4 pt-24">
        <div className="rounded-lg bg-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold">Please sign in to view your profile</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 pt-24">
      <div className="mb-8 flex items-center gap-4">
        <img
          src={user.photoURL || 'https://via.placeholder.com/100'}
          alt={user.displayName}
          className="h-20 w-20 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{user.displayName}</h1>
          <p className="text-gray-400">{user.email}</p>
          <span className="mt-2 inline-block rounded-full bg-red-600 px-3 py-1 text-sm">
            {user.plan} Plan
          </span>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-bold">My Watchlist</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {watchlistMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}