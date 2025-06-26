import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export function Profile() {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState<{ email: string; created_at?: string; updated_at?: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await api.getCurrentUser();
        setUserInfo({
          email: data.email,
          created_at: data.created_at,
          updated_at: data.updated_at,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user info');
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <div className="p-8 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Profile</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>}
      {userInfo ? (
        <div className="mb-6 space-y-2">
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span>
            <span className="ml-2 text-gray-800 dark:text-gray-100">{userInfo.email}</span>
          </div>
          {userInfo.created_at && (
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">Created At:</span>
              <span className="ml-2 text-gray-800 dark:text-gray-100">{new Date(userInfo.created_at).toLocaleString()}</span>
            </div>
          )}
          {userInfo.updated_at && (
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">Updated At:</span>
              <span className="ml-2 text-gray-800 dark:text-gray-100">{new Date(userInfo.updated_at).toLocaleString()}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-600 dark:text-gray-300">Loading user info...</div>
      )}
    </div>
  );
} 