import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import toast from 'react-hot-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    toast.error('Please login to access this page');
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    toast.error('Admin access required');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}