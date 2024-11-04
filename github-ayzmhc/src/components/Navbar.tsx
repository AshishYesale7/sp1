import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Film } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-red-600">
          <Film className="h-8 w-8" />
          MovieStream
        </Link>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-64 rounded-full bg-gray-800 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <Link
            to="/browse"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Browse
          </Link>

          <Link
            to="/profile"
            className="rounded-full bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}