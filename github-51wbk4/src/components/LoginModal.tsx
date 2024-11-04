import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { setUser } from '../services/auth';
import { login } from '../services/auth';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    
    if (user) {
      dispatch(setUser(user));
      toast.success('Logged in successfully');
      onClose();
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Login</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email/Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold transition-colors hover:bg-red-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Default admin credentials: admin / 1234
        </p>
      </div>
    </div>
  );
}