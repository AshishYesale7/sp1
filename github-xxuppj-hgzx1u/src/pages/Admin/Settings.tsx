import React from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700">
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Site Name</label>
              <input
                type="text"
                className="w-full rounded-lg bg-gray-700 px-4 py-2"
                defaultValue="MovieStream"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Site Logo</label>
              <input
                type="file"
                className="w-full rounded-lg bg-gray-700 px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Default Language
              </label>
              <select className="w-full rounded-lg bg-gray-700 px-4 py-2">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold">Video Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Play Videos</p>
                <p className="text-sm text-gray-400">
                  Play videos automatically on page load
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Default Quality</p>
                <p className="text-sm text-gray-400">
                  Set default video quality
                </p>
              </div>
              <select className="rounded-lg bg-gray-700 px-4 py-2">
                <option>1080p</option>
                <option>720p</option>
                <option>480p</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Subtitles</p>
                <p className="text-sm text-gray-400">
                  Enable subtitles by default
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold">Payment Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Stripe Secret Key
              </label>
              <input
                type="password"
                className="w-full rounded-lg bg-gray-700 px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                PayPal Client ID
              </label>
              <input
                type="password"
                className="w-full rounded-lg bg-gray-700 px-4 py-2"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold">API Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                TMDB API Key
              </label>
              <input
                type="password"
                className="w-full rounded-lg bg-gray-700 px-4 py-2"
                defaultValue="a30eb197f4d14ce9710480a821288f6c"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Firebase Config
              </label>
              <textarea
                className="w-full rounded-lg bg-gray-700 px-4 py-2"
                rows={4}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}