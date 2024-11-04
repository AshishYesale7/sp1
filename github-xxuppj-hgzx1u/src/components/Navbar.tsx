import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Film, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../services/auth';
import LoginModal from './LoginModal';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-red-600">
          <Film className="h-8 w-8" />
          MovieStream
        </Link>

        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-64 rounded-full bg-gray-800 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </form>

          <Link
            to="/browse"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Browse
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/profile"
                className="rounded-full bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="rounded-full bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            >
              <User className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </nav>
  );
}