import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ship, Menu, X, Settings, FileText, Users, Info, User, LogOut, DollarSign } from 'lucide-react';
import { t } from '../../utils/i18n';
import authService from '../../services/authService';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: t('nav.dashboard'), href: '/', icon: Ship },
    { name: t('nav.contracts'), href: '/contracts-management', icon: FileText },
    { name: t('nav.system'), href: '/system-management', icon: Settings },
    { name: t('nav.about'), href: '/about', icon: Info },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Ship style={{ width: '2rem', height: '2rem', color: '#2563eb' }} />
                <span style={{
                  marginLeft: '0.5rem',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#111827'
                }}>{t('app.title')}</span>
              </Link>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: isActive ? '#2563eb' : '#4b5563',
                        backgroundColor: isActive ? '#eff6ff' : 'transparent',
                        textDecoration: 'none'
                      }}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* 用户信息 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                    {authService.getCurrentUser() || 'admin'}
                  </span>
                </div>
                <button
                  onClick={() => authService.logout()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    color: '#6b7280',
                    backgroundColor: 'transparent',
                    border: '1px solid #d1d5db',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                  title="登出"
                >
                  <LogOut size={14} />
                  {t('nav.logout')}
                </button>
              </div>

              {/* 语言选择器 */}
              <select 
                onChange={(e) => {
                  const newLang = e.target.value;
                  localStorage.setItem('language', newLang);
                  window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
                  window.location.reload();
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
                defaultValue={localStorage.getItem('language') || 'zh'}
              >
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>

            <div style={{ display: 'none' }}>
              <button
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  color: '#4b5563',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X style={{ width: '1.5rem', height: '1.5rem' }} />
                ) : (
                  <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div style={{
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        color: isActive ? '#2563eb' : '#4b5563',
                        backgroundColor: isActive ? '#eff6ff' : 'transparent',
                        textDecoration: 'none'
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon size={20} />
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* 移动端登出按钮 */}
                <button
                  onClick={() => {
                    authService.logout();
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    color: '#dc2626',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <LogOut size={20} />
                  {t('nav.logout')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;