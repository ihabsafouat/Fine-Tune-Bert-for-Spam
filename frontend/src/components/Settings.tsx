import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export function Settings() {
  const { token, setToken } = useAuth();
  const [email, setEmail] = useState(token?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await api.updateUserEmail(email);
      setMessage(res.message);
      // Update token in context and localStorage
      if (token) {
        const updatedToken = { ...token, email };
        setToken(updatedToken);
        localStorage.setItem('token', JSON.stringify(updatedToken));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update email');
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await api.updateUserPassword(newPassword, confirmPassword);
      setMessage(res.message);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</div>
      )}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>
      )}
      <form onSubmit={handleEmailUpdate} className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Update Email</h3>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded mb-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Email
        </button>
      </form>
      <form onSubmit={handlePasswordUpdate} className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Change Password</h3>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded mb-2"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border rounded mb-2"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Dark Mode</span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 duration-300 focus:outline-none ${darkMode ? 'justify-end' : 'justify-start'}`}
            onClick={() => setDarkMode((v) => !v)}
            type="button"
          >
            <span className={`w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transition-all duration-300`}></span>
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Email Notifications</span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 duration-300 focus:outline-none ${notifications ? 'justify-end' : 'justify-start'}`}
            onClick={() => setNotifications((v) => !v)}
            type="button"
          >
            <span className={`w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transition-all duration-300`}></span>
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">More Settings</h3>
        <p className="text-gray-600 dark:text-gray-400">Additional settings will be available soon.</p>
      </div>
    </div>
  );
} 