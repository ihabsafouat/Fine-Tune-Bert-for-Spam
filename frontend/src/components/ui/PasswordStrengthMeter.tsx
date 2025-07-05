import React from 'react';
import zxcvbn from 'zxcvbn';

const scoreLabels = [
  { label: 'Very weak', color: 'bg-red-500', text: 'text-red-600' },
  { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-600' },
  { label: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-600' },
  { label: 'Good', color: 'bg-blue-500', text: 'text-blue-600' },
  { label: 'Strong', color: 'bg-green-500', text: 'text-green-600' },
];

export const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  if (!password) return null;
  const { score, feedback } = zxcvbn(password);
  const { label, color, text } = scoreLabels[score];
  const percent = ((score + 1) / 5) * 100;

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded transition-all duration-300 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className={`text-xs mt-1 font-medium ${text}`}>{label}</div>
      {feedback.warning && (
        <div className="text-xs text-yellow-700 mt-1">{feedback.warning}</div>
      )}
      {feedback.suggestions && feedback.suggestions.length > 0 && (
        <ul className="text-xs text-gray-500 mt-1 list-disc list-inside">
          {feedback.suggestions.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// If TypeScript still complains about zxcvbn, add a module declaration:
// declare module 'zxcvbn'; 