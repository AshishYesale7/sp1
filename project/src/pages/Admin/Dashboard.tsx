import React from 'react';
import { BarChart3, Users, Film, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-lg bg-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/20 p-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-2xl font-bold">5,678</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-500/20 p-3">
              <Film className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Movies</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-500/20 p-3">
              <BarChart3 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Revenue</p>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-500/20 p-3">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Plans</p>
              <p className="text-2xl font-bold">789</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Users</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt="User avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">User {i}</p>
                  <p className="text-sm text-gray-400">Premium Plan</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold">Popular Movies</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <img
                  src={`https://picsum.photos/40/60?random=${i}`}
                  alt="Movie poster"
                  className="h-15 w-10 rounded object-cover"
                />
                <div>
                  <p className="font-medium">Movie Title {i}</p>
                  <p className="text-sm text-gray-400">1.2k views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}