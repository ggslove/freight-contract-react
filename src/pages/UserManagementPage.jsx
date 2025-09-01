import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Shield, User } from 'lucide-react';
import { t } from '../utils/i18n';
import userService from '../services/userService';

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

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#e6f7ff', borderRadius: '0.5rem' }}>
              <Users size={20} style={{ color: '#1890ff' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('users.totalUsers')}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('users.totalUsersDesc')}</p>
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1890ff' }}>
            {users.length}
          </h2>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#f6ffed', borderRadius: '0.5rem' }}>
              <User size={20} style={{ color: '#52c41a' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('users.activeUsers')}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('users.activeUsersDesc')}</p>
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>
            {users.filter(user => user.status === 'ENABLED').length}
          </h2>
        </div>
      </div>

      {/* 用户列表 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.username')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.realName')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.email')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.phone')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.role')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.status')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.createdAt')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.lastLogin')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '1rem' }}>{user.username}</td>
                <td style={{ padding: '1rem' }}>{user.realName || '-'}</td>
                <td style={{ padding: '1rem' }}>{user.email}</td>
                <td style={{ padding: '1rem' }}>{user.phone || '-'}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#e6f7ff',
                    color: '#1890ff',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}>
                    {getRoleDisplayName(user.role)}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      backgroundColor: user.status === 'ENABLED' ? '#52c41a' : '#ff4d4f',
                      color: 'white'
                    }}
                  >
                    {getStatusDisplayName(user.status)}
                  </button>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{formatDate(user.createdAt)}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{formatDate(user.lastLogin)}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => openEditModal(user)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#096dd9'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#ff7875'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4d4f'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加用户模态框 */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>{t('users.addUser')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>{t('users.username')}</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.realName')}</label>
                <input
                  type="text"
                  value={formData.realName}
                  onChange={(e) => setFormData({...formData, realName: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.phone')}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.role')}</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                >
                  <option value="">{t('users.selectRole')}</option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>{t('users.password')}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.confirmPassword')}</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  color: '#666',
                  border: '1px solid #d9d9d9',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleAddUser}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {t('users.confirmAdd')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑用户模态框 */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>{t('users.editUser')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>{t('users.username')}</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.realName')}</label>
                <input
                  type="text"
                  value={formData.realName}
                  onChange={(e) => setFormData({...formData, realName: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.phone')}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.role')}</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>{t('users.password')} ({t('users.optional')})</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>{t('users.confirmPassword')} ({t('users.optional')})</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                  setFormData({ username: '', realName: '', email: '', phone: '', role: '', password: '', confirmPassword: '' });
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'white',
                  color: '#666',
                  border: '1px solid #d9d9d9',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleEditUser}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {t('users.confirmEdit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagementPage;