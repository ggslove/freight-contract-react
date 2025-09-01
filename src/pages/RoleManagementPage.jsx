import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { t } from '../utils/i18n';
import roleService from '../services/roleService';
import RoleStats from '../components/Role/RoleStats';
import RoleTable from '../components/Role/RoleTable';
import RoleFormModal from '../components/Role/RoleFormModal';

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
    <>
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

      <RoleStats roles={roles} />

      <RoleTable
        roles={roles}
        onEdit={openEditModal}
        onDelete={handleDeleteRole}
        formatDate={(dateString) => new Date(dateString).toLocaleString('zh-CN')}
      />

      <RoleFormModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ name: '', description: '', permissions: [] });
        }}
        onSubmit={handleAddRole}
        formData={formData}
        setFormData={setFormData}
        allPermissions={allPermissions}
        togglePermission={togglePermission}
        isEditMode={false}
      />

      <RoleFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedRole(null);
          setFormData({ name: '', description: '', permissions: [] });
        }}
        onSubmit={handleEditRole}
        formData={formData}
        setFormData={setFormData}
        allPermissions={allPermissions}
        togglePermission={togglePermission}
        isEditMode={true}
      />
    </>
  );
};

export default RoleManagementPage;