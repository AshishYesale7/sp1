import React from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  icon?: React.ReactNode;
}

export default function MovieSection({ title, movies, icon }: MovieSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center gap-2">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}