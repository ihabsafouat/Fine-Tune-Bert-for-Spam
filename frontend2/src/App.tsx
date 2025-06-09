import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './app/contexts/AuthContext';
import { Login } from './app/components/Login';
import { Register } from './app/components/Register';
import { EmailList } from './app/components/EmailList';
import { EmailComposer } from './app/components/EmailComposer';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { LogOut, Inbox, Send, PlusCircle } from 'lucide-react';
import { useState } from 'react';

function AuthenticatedApp() {
  const { logout } = useAuth();
  const [activeView, setActiveView] = useState<'inbox' | 'compose'>('inbox');

  return (
    <div className="min-h-screen bg-brand-light-bg dark:bg-brand-dark-bg">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-16 bg-brand-dark-bg dark:bg-brand-dark-red p-4 flex flex-col items-center space-y-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveView('inbox')}
            className={`text-brand-light-bg hover:text-brand-light-bg hover:bg-brand-medium-blue ${
              activeView === 'inbox' ? 'bg-brand-medium-blue' : ''
            }`}
          >
            <Inbox className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveView('compose')}
            className={`text-brand-light-bg hover:text-brand-light-bg hover:bg-brand-medium-blue ${
              activeView === 'compose' ? 'bg-brand-medium-blue' : ''
            }`}
          >
            <PlusCircle className="w-6 h-6" />
          </Button>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="text-brand-light-bg hover:text-brand-light-bg hover:bg-brand-medium-blue"
          >
            <LogOut className="w-6 h-6" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeView === 'inbox' ? <EmailList /> : <EmailComposer />}
        </div>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <AuthenticatedApp />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/app" />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}