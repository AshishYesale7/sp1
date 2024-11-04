import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Film, Users, Settings } from 'lucide-react';
import Dashboard from './Admin/Dashboard';
import MovieManagement from './Admin/MovieManagement';
import UserManagement from './Admin/UserManagement';
import AdminSettings from './Admin/Settings';

export default function Admin() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'bg-red-600 text-white'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="mb-6 text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            to="/admin"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${isActive('/admin')}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/movies"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${isActive('/admin/movies')}`}
          >
            <Film className="h-5 w-5" />
            Movies
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${isActive('/admin/users')}`}
          >
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${isActive('/admin/settings')}`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<MovieManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
}