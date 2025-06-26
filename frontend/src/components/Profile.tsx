import { useAuth } from '../contexts/AuthContext';

export function Profile() {
  const { token } = useAuth();
  return (
    <div className="p-8 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Profile</h2>
      <div className="mb-6">
        <div className="mb-2">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span>
          <span className="ml-2 text-gray-800 dark:text-gray-100">{token?.email || 'user@example.com'}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700 dark:text-gray-200">API Key:</span>
          <span className="ml-2 text-xs break-all bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{token?.api_key || 'N/A'}</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Change Password</h3>
        <form className="space-y-2">
          <input type="password" placeholder="New password" className="w-full px-3 py-2 border rounded" disabled />
          <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2 border rounded" disabled />
          <button type="button" className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed" disabled>Change Password (Coming Soon)</button>
        </form>
      </div>
    </div>
  );
} 