import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, FileCheck } from 'lucide-react';
import { t } from '../utils/i18n';
import ContractsPage from './ContractsPage';
import CurrencyManagementPage from './CurrencyManagementPage';

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
      component: CurrencyManagementPage
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component;

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* 头部 */}
        <div style={{
          backgroundColor: '#1890ff',
          color: 'white',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <FileCheck size={24} />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{t('contractManagement.title')}</h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>{t('contractManagement.subtitle')}</p>
          </div>
        </div>

        {/* 标签页导航 */}
        <div style={{
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ display: 'flex' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 1.5rem',
                    border: 'none',
                    backgroundColor: activeTab === tab.key ? 'white' : 'transparent',
                    color: activeTab === tab.key ? '#1890ff' : '#666',
                    fontWeight: activeTab === tab.key ? '500' : 'normal',
                    borderBottom: activeTab === tab.key ? '2px solid #1890ff' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 内容区域 */}
        <div style={{ padding: '0' }}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default ContractManagementPage;