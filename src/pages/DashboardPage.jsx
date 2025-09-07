import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { t } from '../utils/i18n';
import StatsCard from '../components/Common/StatsCard';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalContracts: 0,
    totalReceivables: 0,
    totalPayables: 0,
    netCashflow: 0,
    pendingContracts: 0,
    completedContracts: 0
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    // 模拟数据
    const mockData = {
      totalContracts: 156,
      totalReceivables: 2850000,
      totalPayables: 2100000,
      netCashflow: 750000,
      pendingContracts: 23,
      completedContracts: 133
    };
    setStats(mockData);
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 图表数据
  const currencyData = {
    labels: ['人民币', '美元', '欧元', '英镑', '日元'],
    datasets: [
      {
        data: [45, 30, 15, 7, 3],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
        borderWidth: 0,
      },
    ],
  };

  const monthlyData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '应收金额',
        data: [280000, 320000, 290000, 350000, 380000, 420000],
        backgroundColor: '#3B82F6',
        borderRadius: 4,
      },
      {
        label: '应付金额',
        data: [220000, 260000, 240000, 290000, 310000, 340000],
        backgroundColor: '#EF4444',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '¥' + (value / 10000) + '万';
          }
        }
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', { 
      style: 'currency', 
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.subtitle')}
          </p>
        </div>
        
        {/* Date Range Selector */}
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          // 更新输入框的focus类名
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-hidden"
          />
          <span className="text-gray-500 dark:text-gray-400">-</span>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-hidden"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('dashboard.totalContracts')}
          value={stats.totalContracts}
          trend={12.5}
          trendUp={true}
          icon="📋"
        />
        <StatsCard
          title={t('dashboard.totalReceivables')}
          value={`¥${formatCurrency(stats.totalReceivables)}`}
          trend={8.2}
          trendUp={true}
          icon="💰"
        />
        <StatsCard
          title={t('dashboard.totalPayables')}
          value={`¥${formatCurrency(stats.totalPayables)}`}
          trend={-3.1}
          trendUp={false}
          icon="💸"
        />
        <StatsCard
          title={t('dashboard.netProfit')}
          value={`¥${formatCurrency(stats.netCashflow)}`}
          trend={15.8}
          trendUp={true}
          icon="📈"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.monthlyRevenue')}
          </h3>
          <div className="h-64">
            <Bar data={monthlyData} options={chartOptions} />
          </div>
        </div>

        {/* Currency Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.currencyDistribution')}
          </h3>
          <div className="h-64">
            <Doughnut 
              data={currencyData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('dashboard.recentActivity')}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  新合同 HT2024006 已创建
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2小时前
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  应收款 ¥85,000 已到账
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3小时前
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  合同 HT2024003 状态更新为已完成
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  5小时前
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;