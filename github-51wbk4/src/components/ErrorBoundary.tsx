import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
          <div className="rounded-lg bg-gray-800 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-500">Something went wrong</h2>
            <p className="mb-4 text-gray-400">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}