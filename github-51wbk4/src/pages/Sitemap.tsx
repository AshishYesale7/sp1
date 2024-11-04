import React from 'react';
import { Link } from 'react-router-dom';

export default function Sitemap() {
  const routes = [
    { path: '/', name: 'Home', description: 'Main landing page with featured content' },
    { path: '/browse', name: 'Browse', description: 'Explore all movies and series' },
    { path: '/profile', name: 'Profile', description: 'User profile and watchlist' },
    { path: '/admin', name: 'Admin Panel', description: 'Admin dashboard and controls' },
    { path: '/about', name: 'About', description: 'About MovieStream' },
    { path: '/privacy', name: 'Privacy Policy', description: 'Privacy policy and terms' },
  ];

  return (
    <main className="container mx-auto min-h-screen px-4 py-24">
      <h1 className="mb-8 text-3xl font-bold">Sitemap</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className="rounded-lg bg-gray-800 p-6 transition-transform hover:scale-105"
          >
            <h2 className="mb-2 text-xl font-semibold">{route.name}</h2>
            <p className="text-sm text-gray-400">{route.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}