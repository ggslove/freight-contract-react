import React, { useState } from 'react';
import { Shield, Plus, Edit, Trash2, CheckSquare, Square } from 'lucide-react';
import { t } from '../utils/i18n';

const RoleManagementPage = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: '超级管理员',
      description: '系统超级管理员，拥有所有权限',
      permissions: [
        '系统管理', '用户管理', '角色管理', '合同管理', '财务管理', 
        '币种管理', '报表查看', '数据导出', '系统配置'
      ],
      userCount: 1,
      createTime: '2024-01-15 10:00:00',
      isSystem: true
    },
    {
      id: 2,
      name: '系统管理员',
      description: '系统管理员，负责系统日常维护',
      permissions: [
        '用户管理', '角色管理', '合同管理', '财务管理', 
        '币种管理', '报表查看', '数据导出'
      ],
      userCount: 2,
      createTime: '2024-01-16 09:30:00',
      isSystem: false
    },
    {
      id: 3,
      name: '业务经理',
      description: '业务经理，负责合同管理和客户关系',
      permissions: [
        '合同管理', '客户管理', '报表查看', '数据导出'
      ],
      userCount: 5,
      createTime: '2024-01-17 14:20:00',
      isSystem: false
    },
    {
      id: 4,
      name: '财务人员',
      description: '财务人员，负责收付款管理',
      permissions: [
        '财务管理', '合同查看', '报表查看', '数据导出'
      ],
      userCount: 3,
      createTime: '2024-01-18 11:15:00',
      isSystem: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const allPermissions = [
    '系统管理', '用户管理', '角色管理', '合同管理', '财务管理',
    '币种管理', '客户管理', '报表查看', '数据导出', '系统配置',
    '合同创建', '合同编辑', '合同删除', '合同审核', '付款管理',
    '收款管理', '发票管理', '统计分析', '日志查看'
  ];

  const handleAddRole = () => {
    const newRole = {
      id: roles.length + 1,
      ...formData,
      userCount: 0,
      createTime: new Date().toLocaleString('zh-CN'),
      isSystem: false
    };
    
    setRoles([...roles, newRole]);
    setShowAddModal(false);
    setFormData({ name: '', description: '', permissions: [] });
  };

  const handleEditRole = () => {
    setRoles(roles.map(role => 
      role.id === selectedRole.id ? { ...role, ...formData } : role
    ));
    setShowEditModal(false);
    setSelectedRole(null);
    setFormData({ name: '', description: '', permissions: [] });
  };

  const handleDeleteRole = (id) => {
    const role = roles.find(r => r.id === id);
    if (role.isSystem) {
      alert('系统预置角色不能删除');
      return;
    }
    if (role.userCount > 0) {
      alert('该角色下还有用户，不能删除');
      return;
    }
    if (window.confirm('确定要删除该角色吗？')) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const togglePermission = (permission) => {
    const newPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: newPermissions });
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setShowEditModal(true);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('system.roleManagement')}</h1>
          <p style={{ color: '#666' }}>{t('system.description')}</p>
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
          {t('system.addRole')}
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
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{t('system.roleManagement')}</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{roles.length}</h2>
            </div>
            <Shield size={32} style={{ color: '#1890ff' }} />
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
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{t('system.systemRoles')}</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#faad14' }}>
                {roles.filter(r => r.isSystem).length}
              </h2>
            </div>
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
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{t('system.customRoles')}</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>
                {roles.filter(r => !r.isSystem).length}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 角色列表 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.roleName')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.roleDescription')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.permissions')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.userCount')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('common.type')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.createTime')}</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{role.name}</td>
                <td style={{ padding: '1rem', color: '#666', maxWidth: '200px' }}>{role.description}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#f0f9ff',
                    color: '#1890ff',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}>
                    {role.permissions.length} 项
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#f6ffed',
                    color: '#52c41a',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}>
                    {role.userCount} 人
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: role.isSystem ? '#fff7e6' : '#e6f7ff',
                    color: role.isSystem ? '#faad14' : '#1890ff',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}>
                    {role.isSystem ? t('system.systemRoles') : t('system.customRoles')}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{role.createTime}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => openEditModal(role)}
                      disabled={role.isSystem}
                      style={{
                        padding: '0.375rem 0.75rem',
                        backgroundColor: role.isSystem ? '#d9d9d9' : '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: role.isSystem ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => !role.isSystem && (e.target.style.backgroundColor = '#096dd9')}
                      onMouseLeave={(e) => !role.isSystem && (e.target.style.backgroundColor = '#1890ff')}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      disabled={role.isSystem || role.userCount > 0}
                      style={{
                        padding: '0.375rem 0.75rem',
                        backgroundColor: (role.isSystem || role.userCount > 0) ? '#d9d9d9' : '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: (role.isSystem || role.userCount > 0) ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => !(role.isSystem || role.userCount > 0) && (e.target.style.backgroundColor = '#cf1322')}
                      onMouseLeave={(e) => !(role.isSystem || role.userCount > 0) && (e.target.style.backgroundColor = '#ff4d4f')}
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

      {/* 添加角色模态框 */}
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
            width: '500px',
            maxWidth: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('system.addRole')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>{t('system.roleName')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                <label>{t('system.roleDescription')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem',
                    minHeight: '80px'
                  }}
                />
              </div>
              <div>
                <label>{t('system.permissions')}</label>
                <div style={{ marginTop: '0.5rem' }}>
                  {allPermissions.map(permission => (
                    <div key={permission} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <button
                        onClick={() => togglePermission(permission)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          fontSize: '0.875rem'
                        }}
                      >
                        {formData.permissions.includes(permission) ? 
                          <CheckSquare size={16} style={{ color: '#1890ff' }} /> : 
                          <Square size={16} style={{ color: '#d9d9d9' }} />
                        }
                        {permission}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ name: '', description: '', permissions: [] });
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
                onClick={handleAddRole}
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
                {t('system.confirmAdd')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑角色模态框 */}
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
            width: '500px',
            maxWidth: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('system.editRole')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>{t('system.roleName')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                <label>{t('system.roleDescription')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem',
                    minHeight: '80px'
                  }}
                />
              </div>
              <div>
                <label>{t('system.permissions')}</label>
                <div style={{ marginTop: '0.5rem' }}>
                  {allPermissions.map(permission => (
                    <div key={permission} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <button
                        onClick={() => togglePermission(permission)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          fontSize: '0.875rem'
                        }}
                      >
                        {formData.permissions.includes(permission) ? 
                          <CheckSquare size={16} style={{ color: '#1890ff' }} /> : 
                          <Square size={16} style={{ color: '#d9d9d9' }} />
                        }
                        {permission}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedRole(null);
                  setFormData({ name: '', description: '', permissions: [] });
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
                onClick={handleEditRole}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#096dd9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
              >
                {t('system.confirmEdit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagementPage;