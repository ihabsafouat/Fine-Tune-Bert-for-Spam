import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Email } from '../types';

// Define app state types
type AppState = {
  sentEmails: Email[];
  receivedEmails: Email[];
  spamEmails: Email[];
  selectedEmail: Email | null;
  isLoading: boolean;
  error: string | null;
  activeTab: 'inbox' | 'sent' | 'spam' | 'important';
  searchQuery: string;
  filters: {
    dateRange: { start: Date | null; end: Date | null };
    showSpam: boolean;
  };
};

// Define action types
type AppAction =
  | { type: 'SET_EMAILS'; payload: { sent: Email[]; received: Email[]; spam: Email[] } }
  | { type: 'SELECT_EMAIL'; payload: Email | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: AppState['activeTab'] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> };

// Initial state
const initialState: AppState = {
  sentEmails: [],
  receivedEmails: [],
  spamEmails: [],
  selectedEmail: null,
  isLoading: false,
  error: null,
  activeTab: 'inbox',
  searchQuery: '',
  filters: {
    dateRange: { start: null, end: null },
    showSpam: false,
  },
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_EMAILS':
      return {
        ...state,
        sentEmails: action.payload.sent,
        receivedEmails: action.payload.received,
        spamEmails: action.payload.spam,
      };
    case 'SELECT_EMAIL':
      return { ...state, selectedEmail: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload } 
      };
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}