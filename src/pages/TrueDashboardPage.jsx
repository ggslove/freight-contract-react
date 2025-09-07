import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import contractService from '../services/contractService';
import currencyService from '../services/currencyService';

// TailAdmin风格的卡片组件
const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </div>
    {trend && (
      <div className="flex items-center mt-4">
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? '↑' : '↓'} {trend}%
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last month</span>
      </div>
    )}
  </div>
);

// 图表图标组件
const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const TrueDashboardPage = () => {
  const user = { username: 'Admin' }; // 临时用户数据
  const [stats, setStats] = useState({
    totalContracts: 0,
    totalRevenue: 0,
    totalCurrencies: 0,
    netCashflow: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [contracts, currencies] = await Promise.all([
          contractService.getContracts(),
          currencyService.getCurrencies()
        ]);

        const totalRevenue = contracts.reduce((sum, contract) => sum + (contract.revenue || 0), 0);
        const totalExpenses = contracts.reduce((sum, contract) => sum + (contract.expenses || 0), 0);

        setStats({
          totalContracts: contracts.length,
          totalRevenue,
          totalCurrencies: currencies.length,
          netCashflow: totalRevenue - totalExpenses
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.title')}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('dashboard.welcome', { name: user?.username || 'User' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={t('dashboard.totalContracts')}
          value={loading ? '...' : stats.totalContracts}
          icon={FileIcon}
          trend={12}
          trendUp={true}
        />
        <StatCard
          title={t('dashboard.totalRevenue')}
          value={loading ? '...' : formatCurrency(stats.totalRevenue)}
          icon={DollarIcon}
          trend={8}
          trendUp={true}
        />
        <StatCard
          title={t('dashboard.totalCurrencies')}
          value={loading ? '...' : stats.totalCurrencies}
          icon={CurrencyIcon}
          trend={5}
          trendUp={true}
        />
        <StatCard
          title={t('dashboard.netProfit')}
          value={loading ? '...' : formatCurrency(stats.netCashflow)}
          icon={ChartIcon}
          trend={stats.netCashflow > 0 ? 15 : -5}
          trendUp={stats.netCashflow > 0}
        />\n      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contracts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('dashboard.recentContracts')}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t('dashboard.noRecentActivity')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('dashboard.quickActions')}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/70 transition-colors">
                {t('dashboard.addContract')}
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/70 transition-colors">
                {t('dashboard.addCurrency')}
              </button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/70 transition-colors">
                {t('dashboard.viewReports')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 添加CurrencyIcon组件
const CurrencyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default TrueDashboardPage;