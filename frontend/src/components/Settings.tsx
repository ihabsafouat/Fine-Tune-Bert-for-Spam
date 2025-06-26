import { useState } from 'react';

export function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-8 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>
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