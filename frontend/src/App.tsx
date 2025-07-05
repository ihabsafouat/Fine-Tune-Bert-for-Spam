import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Toaster } from './components/ui/toaster';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';

// Suppress React Router v7 deprecation warnings
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

const Login = lazy(() => import('./components/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./components/Register').then(m => ({ default: m.Register })));
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const Profile = lazy(() => import('./components/Profile').then(m => ({ default: m.Profile })));
const Settings = lazy(() => import('./components/Settings').then(m => ({ default: m.Settings })));

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
        {/* Animated gradient background will be added globally via CSS */}
        <Router {...router}>
          <AuthProvider>
            <AppProvider>
              <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-xl text-white">Chargement...</div>}>
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
              </Suspense>
            </AppProvider>
          </AuthProvider>
        </Router>
      </div>
    </ErrorBoundary>
  );
}