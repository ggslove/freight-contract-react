import React, { useState } from 'react';
import { Settings, User, Shield, Database, Lock, Bell } from 'lucide-react';
import { t } from '../utils/i18n';
import UserManagementPage from './UserManagementPage';
import RoleManagementPage from './RoleManagementPage';

const SystemManagementPage = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    {
      key: 'users',
      label: t('system.userManagement'),
      icon: User,
      component: UserManagementPage
    },
    {
      key: 'roles',
      label: t('system.roleManagement'),
      icon: Shield,
      component: RoleManagementPage
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component;

  return (
    <>
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
          <Settings size={24} />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{t('system.title')}</h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>{t('system.description')}</p>
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
        <div style={{ padding: '2rem' }}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </>
  );
};

export default SystemManagementPage;