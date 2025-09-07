import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, FileCheck } from 'lucide-react';
import { t } from '../utils/i18n';
import ContractsPage from './ContractsPage';
import CurrencyPage from './CurrencyPage';

const ContractManagementPage = () => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [language, setLanguageState] = useState('zh');

  // 监听语言变化
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguageState(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const tabs = [
    {
      key: 'contracts',
      label: t('contractManagement.contracts'),
      icon: FileText,
      component: ContractsPage
    },
    {
      key: 'currencies',
      label: t('contractManagement.currencies'),
      icon: DollarSign,
      component: CurrencyPage
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component;

  return (
    <div className="max-w-7xl mx-auto">
      {/* 页面头部 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('contractManagement.title')}
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {t('contractManagement.subtitle')}
        </p>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    relative flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.key
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default ContractManagementPage;