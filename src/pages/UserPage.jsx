import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { t } from '../utils/i18n';
import userService from '../services/userService';
import UserStats from '../components/User/UserStats';
import UserTable from '../components/User/UserTable';
import UserForm from '../components/User/UserForm';
import showErrorToast from '../utils/errorToast';
import ErrorBoundary from '../components/ErrorBoundary';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
 const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    realName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const fetchUsers = async () => {
    try {
      console.log("----------> fetchUsers at", new Date().toISOString());
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(t('users.fetchUsersFailed'), error);
      showErrorToast(t('users.fetchUsersFailed') + ': ' + error.message);
      // 避免重复显示相同的错误
      if (error.message !== (error.message || '').toString()) {
        setError(t('users.fetchUsersFailed') + ': ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 合并初始加载和语言变化监听
  useEffect(() => {
    fetchUsers();

    let languageChangeTimeout;
    const handleLanguageChange = () => {
      // 防抖处理，避免重复调用
      clearTimeout(languageChangeTimeout);
      languageChangeTimeout = setTimeout(() => {
        console.log('🌐 Language change triggered fetchUsers');
        fetchUsers();
      }, 100);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      clearTimeout(languageChangeTimeout);
    };
  }, []);

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'SUPER_ADMIN': t('users.superAdmin'),
      'SYSTEM_ADMIN': t('users.systemAdmin'),
      'BUSINESS_MANAGER': t('users.businessManager'),
      'FINANCE_STAFF': t('users.financeStaff'),
      'NORMAL_USER': t('users.normalUser')
    };
    return roleMap[role] || role;
  };

  const getStatusDisplayName = (status) => {
    const statusMap = {
      'ENABLED': t('common.enabled'),
      'DISABLED': t('common.disabled')
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleAddUser = async (values) => {
    try {
      await userService.createUser(values);
      alert(t('users.createSuccess'));
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('创建用户失败:', error);
      showErrorToast(error.message || t('users.createError'));
    }
  };

  const handleUpdateUser = async (values) => {
    if (!editingUser) return;
    
    try {
      await userService.updateUser(editingUser.id, values);
      alert(t('users.updateSuccess'));
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('更新用户失败:', error);
      showErrorToast(error.message || t('users.updateError'));
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm(t('users.confirmDelete'))) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('删除用户失败:', error);
        showErrorToast(t('users.deleteUserFailed') + ': ' + error.message);
      }
    }
  };

  const toggleUserStatus = async (id) => {
    const user = users.find(u => u.id === id);
    const newStatus = user.status === 'ENABLED' ? 'DISABLED' : 'ENABLED';
    
    try {
      const updatedUser = await userService.updateUserStatus(id, newStatus);
      setUsers(users.map(u => u.id === id ? updatedUser : u));
    } catch (error) {
      console.error('更新用户状态失败:', error);
      showErrorToast(t('users.updateUserStatusFailed') + ': ' + error.message);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600 dark:text-gray-400">{t('common.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 text-center">
        {typeof error === 'object' ? error.message || error.toString() : error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('users.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('users.subtitle')}
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <Plus size={16} className="mr-2" />
          {t('users.addUser')}
        </button>
      </div>

      {/* Stats Cards */}
      <UserStats users={users} />

      {/* User Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('users.userList')}
          </h3>
        </div>
        <UserTable
          users={users}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
          onToggleStatus={toggleUserStatus}
          getRoleDisplayName={getRoleDisplayName}
          getStatusDisplayName={getStatusDisplayName}
          formatDate={formatDate}
        />
      </div>
      <ErrorBoundary>
        <UserForm
            onSubmit={editingUser ? handleUpdateUser : handleAddUser}
            formData={formData}
            setFormData={setFormData}
            isEditMode={!!editingUser}
            roles={roles}
            showModal={showModal}
            onClose={() => { setShowModal(false); setEditingUser(null); }}
          />
      </ErrorBoundary>
    </div>
  );
};

export default UserManagementPage;