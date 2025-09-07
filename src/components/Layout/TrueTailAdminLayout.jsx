import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { t } from '../../utils/i18n';
import { Ship } from 'lucide-react';
import authService from '../../services/authService';

// 优化后的图标组件 - 使用更清晰的图标
const Logo = () => (
  <Link to="/" className="flex items-center space-x-3 px-2">
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white text-xs font-bold">运</span>
    </div>
    <span className="text-lg font-semibold text-gray-800 dark:text-white">货运系统</span>
  </Link>
);

// 增强的图标组件 - 选中时显示白色
const DashboardIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 13a2 2 0 012-2h4a2 2 0 012 2v0" />
  </svg>
);

const ContractsIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CurrencyIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const SettingsIcon = ({ isActive }) => (
  <svg className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrueTailAdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 侧边栏状态管理
  const [collapsed, setCollapsed] = useState(false); // 默认不折叠（展开状态）
  const [darkMode, setDarkMode] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({}); // 展开的子菜单
  const location = useLocation();
  const navigate = useNavigate();

  // 监听系统主题
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 多级菜单结构
  const navigation = [
    {
      name: 'dashboard',
      href: '/',
      icon: DashboardIcon,
      label: '仪表盘',
      children: [] // 无子菜单
    },
    {
      name: 'freight',
      icon: ContractsIcon,
      label: '货运业务',
      children: [
        {
          name: 'contracts',
          href: '/contracts',
          label: '合同管理'
        },
        {
          name: 'currencies',
          href: '/currencies',
          label: '币种管理'
        }
      ]
    },
    {
      name: 'system',
      href: '/system-management',
      icon: SettingsIcon,
      label: '系统管理',
      children: [
        {
          name: 'users',
          href: '/users',
          label: '用户管理'
        },
        {
          name: 'roles',
          href: '/roles',
          label: '角色管理'
        }
      ]
    }
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const isMenuActive = (item) => {
    if (item.href && location.pathname === item.href) return true;
    if (item.children) {
      return item.children.some(child => {
        if (!child.href) return false;
        const childPath = child.href.split('?')[0];
        return location.pathname === childPath;
      });
    }
    return false;
  };

  const currentPage = navigation.find(item => isMenuActive(item)) || navigation[0];

  return (
    <div className={`${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      <div className="flex min-h-screen">
        {/* Sidebar - 使用flex布局而非fixed定位 */}
        <div className={`
          ${collapsed ? 'w-16' : 'w-64'} 
          bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-700 
          transition-all duration-300 ease-in-out 
          shadow-lg
          flex-shrink-0
        `}>
          <div className="h-full flex flex-col">
            {/* Logo - 美化版本，使用登录界面的船图标 */}
            <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <Ship className="w-6 h-6 text-white" />
                </div>
                {!collapsed && ( 
                  <div className="space-y-1">
                    <span className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
                      货运系统
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Freight Platform</div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation - 美化版本 */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isMenuActive(item);
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMenus[item.name];

                return (
                  <div key={item.name} className="space-y-1">
                    {/* 一级菜单 - 美化版本 */}
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          toggleSubMenu(item.name);
                        } else if (item.href) {
                          navigate(item.href);
                        }
                      }}
                      className={`
                        flex items-center w-full px-4 py-3
                        text-sm font-medium rounded-xl
                        transition-all duration-300 ease-in-out
                        group relative overflow-hidden
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10' 
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50 hover:shadow-md'
                        }
                        ${collapsed ? 'justify-center px-3 py-3' : ''}
                      `}
                    >
                      <div className="flex items-center flex-1">
                        <div className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}>
                          <Icon isActive={isActive} />
                        </div>
                        {!collapsed && (
                          <>
                            <span className="ml-4">{item.label}</span>
                            {hasChildren && (
                              <div className={`ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </button>

                    {/* 子菜单 - 美化版本 */}
                    {hasChildren && !collapsed && isExpanded && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => {
                          const childPath = child.href.split('?')[0];
                          const isChildActive = location.pathname === childPath;
                          return (
                            <Link
                              key={child.name}
                              to={child.href}
                              className={`
                                flex items-center px-4 py-2.5
                                text-sm rounded-lg transition-all duration-200
                                group relative
                                ${isChildActive
                                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/30 hover:text-gray-900'
                                }
                              `}
                            >
                              <span className={`
                                w-1.5 h-1.5 rounded-full mr-3 transition-all duration-200
                                ${isChildActive 
                                  ? 'bg-blue-500 scale-125' 
                                  : 'bg-gray-400 group-hover:bg-gray-600'
                                }
                              `}></span>
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* User Section - 美化版本 */}
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200 w-full group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                {!collapsed && <span className="font-medium">{t('nav.logout')}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - 使用flex-1自动填充剩余空间 */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                {/* Desktop collapse button */}
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {collapsed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M8 5l7 7-7 7" />
                    )}
                  </svg>
                </button>

                <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {currentPage?.label || t('nav.dashboard')}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-6 0 4 4 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* Notification */}
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TrueTailAdminLayout;