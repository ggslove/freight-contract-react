import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Shield, User } from 'lucide-react';
import { t } from '../utils/i18n';

const UserManagementPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      realName: t('users.systemAdmin'),
      email: 'admin@freight.com',
      phone: '13800138000',
      role: t('users.superAdmin'),
      status: t('users.enabled'),
      createTime: '2024-01-15 10:00:00',
      lastLogin: '2024-01-20 15:30:00'
    },
    {
      id: 2,
      username: 'zhangsan',
      realName: t('users.zhangsan'),
      email: 'zhangsan@company.com',
      phone: '13900139000',
      role: t('users.businessManager'),
      status: t('users.enabled'),
      createTime: '2024-01-18 09:15:00',
      lastLogin: '2024-01-20 14:20:00'
    },
    {
      id: 3,
      username: 'lisi',
      realName: t('users.lisi'),
      email: 'lisi@company.com',
      phone: '13700137000',
      role: t('users.financeStaff'),
      status: t('users.disabled'),
      createTime: '2024-01-19 11:30:00',
      lastLogin: '2024-01-19 16:45:00'
    }
  ]);

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
    t('users.superAdmin'),
    t('users.systemAdmin'),
    t('users.businessManager'),
    t('users.financeStaff'),
    t('users.normalUser')
  ];

  const handleAddUser = () => {
    if (formData.password !== formData.confirmPassword) {
      alert(t('users.passwordMismatch'));
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      ...formData,
      status: t('users.enabled'),
      createTime: new Date().toLocaleString('zh-CN'),
      lastLogin: '-'
    };
    
    delete newUser.password;
    delete newUser.confirmPassword;
    
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setFormData({
      username: '',
      realName: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleEditUser = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, ...formData } : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
    setFormData({
      username: '',
      realName: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm(t('users.confirmDelete'))) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === t('users.enabled') ? t('users.disabled') : t('users.enabled') } : user
    ));
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      realName: user.realName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: '',
      confirmPassword: ''
    });
    setShowEditModal(true);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
            backgroundColor: '#1890ff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(24, 144, 255, 0.2)'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#096dd9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
        >
          <Plus size={16} />
          {t('users.addUser')}
        </button>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{t('users.totalUsers')}</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{users.length}</h2>
            </div>
            <Users size={32} style={{ color: '#1890ff' }} />
          </div>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{t('users.enabledUsers')}</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>
                {users.filter(u => u.status === t('users.enabled')).length}
              </h2>
            </div>
            <User size={32} style={{ color: '#52c41a' }} />
          </div>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{t('users.disabledUsers')}</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff4d4f' }}>
                {users.filter(u => u.status === t('users.disabled')).length}
              </h2>
            </div>
            <Shield size={32} style={{ color: '#ff4d4f' }} />
          </div>
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
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.createTime')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.lastLogin')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '1rem' }}>{user.username}</td>
                <td style={{ padding: '1rem' }}>{user.realName}</td>
                <td style={{ padding: '1rem' }}>{user.email}</td>
                <td style={{ padding: '1rem' }}>{user.phone}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#e6f7ff',
                    color: '#1890ff',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}>
                    {user.role}
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
                      backgroundColor: user.status === '启用' || user.status === 'Enabled' || user.status === 'Aktif' ? '#52c41a' : '#ff4d4f',
                      color: 'white',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    {user.status}
                  </button>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{user.createTime}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{user.lastLogin}</td>
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
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#cf1322'}
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
            width: '400px',
            maxWidth: '90%'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('users.addUser')}</h2>
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
                    <option key={role} value={role}>{role}</option>
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
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d9d9d9',
                  backgroundColor: 'white',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#1890ff'}
                onMouseLeave={(e) => e.target.style.borderColor = '#d9d9d9'}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleAddUser}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#52c41a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#389e0d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#52c41a'}
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
            width: '400px',
            maxWidth: '90%'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('users.editUser')}</h2>
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
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d9d9d9',
                  backgroundColor: 'white',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#1890ff'}
                onMouseLeave={(e) => e.target.style.borderColor = '#d9d9d9'}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleEditUser}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#52c41a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#389e0d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#52c41a'}
              >
                {t('users.confirmEdit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;