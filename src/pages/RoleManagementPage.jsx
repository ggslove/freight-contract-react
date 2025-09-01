import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, CheckSquare, Square } from 'lucide-react';
import { t } from '../utils/i18n';
import roleService from '../services/roleService';

const RoleManagementPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await roleService.getAllRoles();
      setRoles(data);
    } catch (error) {
      console.error('获取角色列表失败:', error);
      setError('获取角色列表失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    if (!formData.name.trim()) {
      alert('请输入角色名称');
      return;
    }

    try {
      const newRole = await roleService.createRole({
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions
      });
      
      setRoles([...roles, newRole]);
      setShowAddModal(false);
      setFormData({ name: '', description: '', permissions: [] });
    } catch (error) {
      alert('创建角色失败: ' + error.message);
    }
  };

  const handleEditRole = async () => {
    if (!formData.name.trim()) {
      alert('请输入角色名称');
      return;
    }

    try {
      const updatedRole = await roleService.updateRole(selectedRole.id, {
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions
      });
      
      setRoles(roles.map(role => role.id === selectedRole.id ? updatedRole : role));
      setShowEditModal(false);
      setSelectedRole(null);
      setFormData({ name: '', description: '', permissions: [] });
    } catch (error) {
      alert('更新角色失败: ' + error.message);
    }
  };

  const handleDeleteRole = async (id) => {
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
      try {
        await roleService.deleteRole(id);
        setRoles(roles.filter(role => role.id !== id));
      } catch (error) {
        alert('删除角色失败: ' + error.message);
      }
    }
  };

  const togglePermission = (permission) => {
    if (formData.permissions.includes(permission)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permission)
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission]
      });
    }
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
      permissions: role.permissions || []
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
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('system.roleManagement')}</h1>
          <p style={{ color: '#666' }}>{t('system.roleManagementDesc')}</p>
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
          {t('system.addRole')}
        </button>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#e6f7ff', borderRadius: '0.5rem' }}>
              <Shield size={20} style={{ color: '#1890ff' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('system.totalRoles')}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('system.totalRolesDesc')}</p>
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1890ff' }}>
            {roles.length}
          </h2>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#fff7e6', borderRadius: '0.5rem' }}>
              <Shield size={20} style={{ color: '#faad14' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('system.systemRoles')}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('system.systemRolesDesc')}</p>
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#faad14' }}>
            {roles.filter(role => role.isSystem).length}
          </h2>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#f6ffed', borderRadius: '0.5rem' }}>
              <Shield size={20} style={{ color: '#52c41a' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('system.customRoles')}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('system.customRolesDesc')}</p>
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>
            {roles.filter(role => !role.isSystem).length}
          </h2>
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
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{new Date(role.createTime).toLocaleString('zh-CN')}</td>
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
                      onMouseEnter={(e) => !(role.isSystem || role.userCount > 0) && (e.target.style.backgroundColor = '#ff7875')}
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
            width: '100%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>{t('system.addRole')}</h2>
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
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div>
                <label>{t('system.permissions')}</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {allPermissions.map(permission => (
                    <label key={permission} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                      />
                      <span>{permission}</span>
                    </label>
                  ))}
                </div>
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
                onClick={handleAddRole}
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
            width: '100%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>{t('system.editRole')}</h2>
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
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div>
                <label>{t('system.permissions')}</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {allPermissions.map(permission => (
                    <label key={permission} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                      />
                      <span>{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedRole(null);
                  setFormData({ name: '', description: '', permissions: [] });
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
                onClick={handleEditRole}
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