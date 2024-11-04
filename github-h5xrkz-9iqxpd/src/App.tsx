import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Watch from './pages/Watch';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
      retry: 1,
      suspense: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/watch/:id" element={<Watch />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/*" element={<Admin />} />
              </Routes>
            </Suspense>
            <Toaster position="bottom-center" />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;