import React from 'react';
import { Heart, Play, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { Movie } from '../types/movie';
import { addToWatchlist, removeFromWatchlist } from '../store/userSlice';
import { RootState } from '../store';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isInWatchlist = user?.watchlist.includes(movie.id) || false;

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie.id));
    }
  };

  return (
    <Link to={`/watch/${movie.id}`} className="group relative overflow-hidden rounded-lg bg-gray-900">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-poster.jpg'}
        alt={movie.title}
        className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-300">
            {movie.overview}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/watch/${movie.id}`);
              }}
              className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-700"
            >
              <Play className="h-4 w-4" />
              Play
            </button>
            <button
              onClick={handleWatchlistClick}
              className={`rounded-full p-2 transition-colors ${
                isInWatchlist ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700/50 hover:bg-gray-600'
              }`}
            >
              <Heart className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};