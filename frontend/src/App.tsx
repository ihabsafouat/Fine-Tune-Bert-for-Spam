import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/toaster';
import Home from './components/Home';
import NeonBackground from './components/NeonBackground';
import ErrorBoundary from './components/ErrorBoundary';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-transparent relative">
        <NeonBackground />
        <Router>
          <AuthProvider>
            <AppProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/app/*"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Home />} />
              </Routes>
              <Toaster />
            </AppProvider>
          </AuthProvider>
        </Router>
      </div>
    </ErrorBoundary>
  );
}