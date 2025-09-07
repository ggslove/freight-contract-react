import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { t } from '../utils/i18n';
import userService from '../services/userService';
import UserStats from '../components/User/UserStats';
import UserTable from '../components/User/UserTable';
import UserFormModal from '../components/User/UserFormModal';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    realName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const roles = [
    { value: 'ADMIN', label: t('users.systemAdmin') },
    { value: 'MANAGER', label: t('users.businessManager') },
    { value: 'FINANCE', label: t('users.financeStaff') },
    { value: 'USER', label: t('users.normalUser') }
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(t('users.fetchUsersFailed'), error);
      setError(t('users.fetchUsersFailed') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  const handleAddUser = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert(t('users.passwordMismatch'));
      return;
    }

    try {
      const newUser = await userService.createUser({
        username: formData.username,
        realName: formData.realName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
        status: 'ENABLED'
      });
      console.log("---------------> newUser:", newUser);
      
      if (newUser) {
        setUsers([...users, newUser]);
        setShowAddModal(false);
        setFormData({ username: '', realName: '', email: '', phone: '', role: '', status: '', password: '', confirmPassword: '' });
      } else {
        alert(t('users.createUserFailedEmpty'));
      }
    } catch (error) {
      // /创建用户失败: Failed to fetch
      alert(t('users.createUserFailed') + ': ' + error.message);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();//这个必须要添加
    try {
      const updatedUser = await userService.updateUser(selectedUser.id, {
        username: formData.username,
        realName: formData.realName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        ...(formData.password && { password: formData.password })
      });
     
      if (updatedUser) {
        setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
        setShowEditModal(false);
        setSelectedUser(null);
        setFormData({ username: '', realName: '', email: '', phone: '', role: '', status: '', password: '', confirmPassword: '' });
      } else {
        alert(t('users.updateUserFailedEmpty') + ': 未能获取更新后的用户数据');
      }
    } catch (error) {
      console.error('更新用户失败11:', error);
      alert(t('users.updateUserFailed') + ': ' + (error.message || '未知错误'));
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm(t('users.confirmDelete'))) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        alert(t('users.deleteUserFailed') + ': ' + error.message);
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
      alert(t('users.updateUserStatusFailed') + ': ' + error.message);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      realName: user.realName || '',
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      status: user.status || 'ENABLED',
      password: '',
      confirmPassword: ''
    });
    setShowEditModal(true);
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
        {error}
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
          onClick={() => setShowAddModal(true)}
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

      {/* User Form Modal */}
      <UserFormModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ username: '', realName: '', email: '', phone: '', role: '', status: '', password: '', confirmPassword: '' });
        }}
        onSubmit={handleAddUser}
        formData={formData}
        setFormData={setFormData}
        roles={roles}
        isEditMode={false}
      />

      <UserFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
          setFormData({ username: '', realName: '', email: '', phone: '', role: '', status: '', password: '', confirmPassword: '' });
        }}
        onSubmit={handleEditUser}
        formData={formData}
        setFormData={setFormData}
        roles={roles}
        isEditMode={true}
      />
    </div>
  );
};

export default UserManagementPage;