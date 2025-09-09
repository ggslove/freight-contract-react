import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { t } from '../utils/i18n';
import contractService from '../services/contractService';
import currencyService from '../services/currencyService';
import showErrorToast from '../utils/errorToast';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
  const [user, setUser] = useState({ username: 'Admin' });
  const [stats, setStats] = useState({
    totalContracts: 0,
    totalRevenue: 0,
    totalCurrencies: 0,
    netCashflow: 0,
    pendingContracts: 0,
    completedContracts: 0,
    totalReceivables: 0,
    totalPayables: 0
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [recentContracts, setRecentContracts] = useState([]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [contracts, currencies] = await Promise.all([
        contractService.getAllContracts(),
        currencyService.getAllCurrencies()
      ]);

      // 计算总收入（合同金额总和）
      const totalRevenue = contracts.reduce((sum, contract) => sum + (contract.amount || 0), 0);
      
      // 计算应收账款（待收款的合同金额总和）
      const pendingContracts = contracts.filter(c => c.status === 'PENDING');
      const totalReceivables = pendingContracts.reduce((sum, contract) => sum + (contract.amount || 0), 0);
      
      // 计算应付账款（这里简化处理，假设为合同金额的70%）
      const totalPayables = totalRevenue * 0.7;

      setStats({
        totalContracts: contracts.length,
        totalRevenue,
        totalCurrencies: currencies.length,
        netCashflow: totalRevenue - totalPayables,
        pendingContracts: pendingContracts.length,
        completedContracts: contracts.filter(c => c.status === 'COMPLETED').length,
        totalReceivables,
        totalPayables
      });

      // 获取最近合同
      const sortedContracts = contracts
        .sort((a, b) => new Date(b.createdAt || b.contractDate) - new Date(a.createdAt || a.contractDate))
        .slice(0, 5);
      setRecentContracts(sortedContracts);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      showErrorToast('获取仪表板统计数据失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    fetchStats();
  }, [dateRange]);

  // 监听语言变化
  // 合并初始加载和语言变化监听
  useEffect(() => {
    fetchStats();

    let languageChangeTimeout;
    const handleLanguageChange = (event) => {
      // 防抖处理，避免重复调用
      clearTimeout(languageChangeTimeout);
      languageChangeTimeout = setTimeout(() => {
        console.log('🌐 Language change triggered fetchStats');
        fetchStats();
      }, 100);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      clearTimeout(languageChangeTimeout);
    };
  }, [dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 图表数据
  const currencyDistribution = {
    labels: ['人民币', '美元', '欧元', '英镑', '日元'],
    datasets: [
      {
        data: [45, 30, 15, 7, 3],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
        borderWidth: 0,
      },
    ],
  };

  const monthlyRevenue = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '收入',
        data: [280000, 320000, 290000, 350000, 380000, 420000],
        backgroundColor: '#3B82F6',
        borderRadius: 4,
      },
      {
        label: '支出',
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

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.title')}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('dashboard.welcome', { name: user?.username || 'Admin' })}
            </p>
          </div>
          
          {/* Date Range Selector */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
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
        />    
      </div>

      {/* Extended Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="待处理合同"
          value={loading ? '...' : stats.pendingContracts}
          icon={ClockIcon}
          trend={-3}
          trendUp={false}
        />
        <StatCard
          title="已完成合同"
          value={loading ? '...' : stats.completedContracts}
          icon={CheckIcon}
          trend={15}
          trendUp={true}
        />
        <StatCard
          title="应收账款"
          value={loading ? '...' : formatCurrency(stats.totalReceivables)}
          icon={ReceiptIcon}
          trend={8}
          trendUp={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            月度收支趋势
          </h3>
          <div className="h-64">
            <Bar data={monthlyRevenue} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            币种分布
          </h3>
          <div className="h-64">
            <Doughnut 
              data={currencyDistribution} 
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
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {recentContracts.length > 0 ? (
                  recentContracts.map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {typeof contract.theClient === 'object' ? contract.theClient?.name || contract.theClient?.clientName || '未知客户' : contract.theClient || '未知客户'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          合同编号: {contract.businessNo}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(contract.amount)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          contract.status === 'COMPLETED' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : contract.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {contract.status === 'PENDING' ? '待处理' :
                           contract.status === 'COMPLETED' ? '已完成' : '进行中'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {t('dashboard.noRecentActivity')}
                    </p>
                  </div>
                )}
              </div>
            )}
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

// 添加扩展图标组件
const CurrencyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ReceiptIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

export default TrueDashboardPage;