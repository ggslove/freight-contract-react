import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import userService from '../services/userService';
import UserTable from '../components/User/UserTable';
import UserForm from '../components/User/UserForm';
import showErrorToast from '../utils/errorToast';
import { safeAsync } from '../utils/globalErrorHandler';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      showErrorToast(t('user.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // 监听语言变化
    const handleLanguageChange = () => {
      console.log('🌐 Language change triggered fetchUsers');
      fetchUsers();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleAddUser = async (values) => {
    await safeAsync(async () => {
      await userService.createUser(values);
      setShowModal(false);
      fetchUsers();
    }, t('user.createError'));
  };

  const handleUpdateUser = async (values) => {
    if (!editingUser) return;
    
    await safeAsync(async () => {
      await userService.updateUser(editingUser.id, values);
      setEditingUser(null);
      setShowModal(false);
      fetchUsers();
    }, t('user.updateError'));
  };

  const handleToggleUserStatus = async (user) => {
    await safeAsync(async () => {
      await userService.updateUser(user.id, {
        ...user,
        isActive: !user.isActive
      });
      fetchUsers();
    }, t('user.statusUpdateError'));
  };

  const handleDeleteUser = async (id) => {
    await safeAsync(async () => {
      await userService.deleteUser(id);
      fetchUsers();
    }, t('user.deleteError'));
  };

  const openEditModal = async (user) => {
    const userData = await safeAsync(
      () => userService.getUserById(user.id),
      t('user.fetchError')
    );
    if (userData) {
      setEditingUser(userData);
      setShowModal(true);
    }
  };

  const closeForm = () => {
    setShowModal(false);
    setEditingUser(null);
  };

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
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('users.addUser')}
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('users.userList')}
          </h3>
        </div>
        <UserTable
          users={users}
          loading={loading}
          onToggleStatus={handleToggleUserStatus}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
        />
      </div>

      <UserForm
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
        isEditMode={!!editingUser}
        editingUser={editingUser}
        onClose={closeForm}
        showModal={showModal}
      />
    </div>
  );
};

export default UserPage;