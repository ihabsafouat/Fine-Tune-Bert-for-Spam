import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { EmailList } from './EmailList';
import { EmailComposer } from './EmailComposer';
import { EmailView } from './EmailView';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Menu, Search, Edit, Mail, Send, AlertTriangle, 
  Star, Calendar, FileText, LogOut, Settings, User, Plus 
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showComposer, setShowComposer] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (tab: 'inbox' | 'sent' | 'spam' | 'important') => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search functionality will be implemented here
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>PCyber Mail</h1>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <Button 
            onClick={() => setShowComposer(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 flex items-center justify-center gap-2 py-2"
          >
            <Plus className="h-5 w-5" />
            {sidebarOpen && <span>Compose</span>}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            <li>
              <Button
                variant={state.activeTab === 'inbox' ? 'secondary' : 'ghost'}
                className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
                onClick={() => handleTabChange('inbox')}
              >
                <Mail className="h-5 w-5 mr-2" />
                {sidebarOpen && <span>Inbox</span>}
              </Button>
            </li>
            <li>
              <Button
                variant={state.activeTab === 'sent' ? 'secondary' : 'ghost'}
                className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
                onClick={() => handleTabChange('sent')}
              >
                <Send className="h-5 w-5 mr-2" />
                {sidebarOpen && <span>Sent</span>}
              </Button>
            </li>
            <li>
              <Button
                variant={state.activeTab === 'spam' ? 'secondary' : 'ghost'}
                className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
                onClick={() => handleTabChange('spam')}
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                {sidebarOpen && <span>Spam</span>}
              </Button>
            </li>
            <li>
              <Button
                variant={state.activeTab === 'important' ? 'secondary' : 'ghost'}
                className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
                onClick={() => handleTabChange('important')}
              >
                <Star className="h-5 w-5 mr-2" />
                {sidebarOpen && <span>Important</span>}
              </Button>
            </li>
          </ul>

          <div className="pt-4 mt-4 border-t border-gray-700">
            <ul className="space-y-2 px-2">
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {sidebarOpen && <span>Calendar</span>}
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  {sidebarOpen && <span>Documents</span>}
                </Button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className={`w-full justify-${sidebarOpen ? 'start' : 'center'}`}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search emails..."
                  className="pl-10 bg-gray-700 border-gray-600 text-white w-full"
                  value={state.searchQuery}
                  onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                />
              </div>
            </form>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Email Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {showComposer ? (
            <div className="max-w-4xl mx-auto">
              <EmailComposer onClose={() => setShowComposer(false)} />
            </div>
          ) : state.selectedEmail ? (
            <div className="max-w-4xl mx-auto">
              <EmailView 
                email={state.selectedEmail} 
                onClose={() => dispatch({ type: 'SELECT_EMAIL', payload: null })} 
              />
            </div>
          ) : (
            <EmailList />
          )}
        </main>
      </div>
    </div>
  );
}