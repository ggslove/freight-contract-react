import React from 'react';

const StatsCard = ({ title, value, change, icon, trend = 'up' }) => {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const trendBg = trend === 'up' ? 'bg-green-100' : 'bg-red-100';
  const trendIcon = trend === 'up' ? '↑' : '↓';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${trendBg}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      {change && (
        <div className="mt-4">
          <span className={`text-sm font-medium ${trendColor}`}>
            {trendIcon} {change}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;