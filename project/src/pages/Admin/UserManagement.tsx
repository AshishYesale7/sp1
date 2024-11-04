import React from 'react';
import { Mail, Shield, Ban } from 'lucide-react';

export default function UserManagement() {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'premium',
      status: 'active',
      joinDate: '2024-01-15',
    },
    // Add more mock users
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm"
          />
        </div>
      </div>

      <div className="rounded-lg bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700 text-sm">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://i.pravatar.cc/40?u=${user.id}`}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-500">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-500">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 hover:bg-gray-600">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-gray-600">
                        <Shield className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-gray-600">
                        <Ban className="h-4 w-4 text-red-500" />
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