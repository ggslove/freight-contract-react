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
    { value: 'SUPER_ADMIN', label: t('users.superAdmin') },
    { value: 'SYSTEM_ADMIN', label: t('users.systemAdmin') },
    { value: 'BUSINESS_MANAGER', label: t('users.businessManager') },
    { value: 'FINANCE_STAFF', label: t('users.financeStaff') },
    { value: 'NORMAL_USER', label: t('users.normalUser') }
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      setError('获取用户列表失败: ' + error.message);
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
    return new Date(dateString).toLocaleString('zh-CN');
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
        password: formData.password
      });
      
      setUsers([...users, newUser]);
      setShowAddModal(false);
      setFormData({ username: '', realName: '', email: '', phone: '', role: '', password: '', confirmPassword: '' });
    } catch (error) {
      alert('创建用户失败: ' + error.message);
    }
  };

  const handleEditUser = async () => {
    try {
      const updatedUser = await userService.updateUser(selectedUser.id, {
        username: formData.username,
        realName: formData.realName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        ...(formData.password && { password: formData.password })
      });
      
      setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
      setShowEditModal(false);
      setSelectedUser(null);
      setFormData({ username: '', realName: '', email: '', phone: '', role: '', password: '', confirmPassword: '' });
    } catch (error) {
      alert('更新用户失败: ' + error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm(t('users.confirmDelete'))) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        alert('删除用户失败: ' + error.message);
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
      alert('更新用户状态失败: ' + error.message);
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
      password: '',
      confirmPassword: ''
    });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div>加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: '#ff4d4f', textAlign: 'center' }}>
        {error}
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('users.title')}</h1>
          <p style={{ color: '#666' }}>{t('users.subtitle')}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          <Plus size={16} />
          {t('users.addUser')}
        </button>
      </div>

      <UserStats users={users} />

      <UserTable
        users={users}
        onEdit={openEditModal}
        onDelete={handleDeleteUser}
        onToggleStatus={toggleUserStatus}
        getRoleDisplayName={getRoleDisplayName}
        getStatusDisplayName={getStatusDisplayName}
        formatDate={formatDate}
      />

      <UserFormModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ username: '', realName: '', email: '', phone: '', role: '', password: '', confirmPassword: '' });
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
          setFormData({ username: '', realName: '', email: '', phone: '', role: '', password: '', confirmPassword: '' });
        }}
        onSubmit={handleEditUser}
        formData={formData}
        setFormData={setFormData}
        roles={roles}
        isEditMode={true}
      />
    </>
  );
};

export default UserManagementPage;