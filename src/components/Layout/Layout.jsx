import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ship, Menu, X, Settings, FileText, Users, Info, User, LogOut, DollarSign } from 'lucide-react';
import { t } from '../../utils/i18n';
import authService from '../../services/authService';
import LanguageSelector from '../LanguageSelector';

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
                <Ship style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
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

              {/* 用户选择器 - 与语言选择器样式一致 */}
              <select 
                onChange={(e) => {
                  if (e.target.value === 'logout') {
                    authService.logout();
                  }
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                  fontSize: '0.75rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  minWidth: 'auto',
                  color: '#374151'
                }}
                defaultValue=""
              >
                <option value="" disabled>{authService.getCurrentUser() || 'admin'}</option>
                <option value="logout" style={{ color: '#dc2626' }}>
                  {t('nav.logout')}
                </option>
              </select>

              {/* 国际化语言切换 */}
              <LanguageSelector />
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
                      <item.icon size={24} />
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* 移动端语言切换 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  color: '#374151',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}>
                  <LanguageSelector />
                </div>

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
                  <LogOut size={24} />
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