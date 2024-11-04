import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Watch from './pages/Watch';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute requireAdmin>
                    <Admin />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
          <Toaster position="bottom-center" />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;