import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { t } from '../utils/i18n';
import roleService from '../services/roleService';
import RoleStats from '../components/Role/RoleStats';
import RoleTable from '../components/Role/RoleTable';
import RoleFormModal from '../components/Role/RoleFormModal';
import showErrorToast from '../utils/errorToast';

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
      showErrorToast('获取角色列表失败: ' + error.message);
      setError('获取角色列表失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 合并初始加载和语言变化监听
  useEffect(() => {
    fetchRoles();

    let languageChangeTimeout;
    const handleLanguageChange = () => {
      // 防抖处理，避免重复调用
      clearTimeout(languageChangeTimeout);
      languageChangeTimeout = setTimeout(() => {
        console.log('🌐 Language change triggered fetchRoles');
        fetchRoles();
      }, 100);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      clearTimeout(languageChangeTimeout);
    };
  }, []);

  const handleAddRole = async () => {
    if (!formData.name.trim()) {
      showErrorToast('请输入角色名称');
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
      console.error('创建角色失败:', error);
      showErrorToast('创建角色失败: ' + error.message);
    }
  };

  const handleEditRole = async () => {
    if (!formData.name.trim()) {
      showErrorToast('请输入角色名称');
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
      console.error('更新角色失败:', error);
      showErrorToast('更新角色失败: ' + error.message);
    }
  };

  const handleDeleteRole = async (id) => {
    const role = roles.find(r => r.id === id);
    if (role.isSystem) {
      showErrorToast('系统预置角色不能删除');
      return;
    }
    if (role.userCount > 0) {
      showErrorToast('该角色下还有用户，不能删除');
      return;
    }

    if (window.confirm('确定要删除该角色吗？')) {
      try {
        await roleService.deleteRole(id);
        setRoles(roles.filter(role => role.id !== id));
      } catch (error) {
        console.error('删除角色失败:', error);
        showErrorToast('删除角色失败: ' + error.message);
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
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600 dark:text-gray-400">加载中...</div>
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
            {t('system.roleManagement')}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('system.roleManagementDesc')}
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <Plus size={16} className="mr-2" />
          {t('system.addRole')}
        </button>
      </div>

      {/* Stats Cards */}
      <RoleStats roles={roles} />

      {/* Role Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('system.roleList')}
          </h3>
        </div>
        <RoleTable
          roles={roles}
          onEdit={openEditModal}
          onDelete={handleDeleteRole}
          formatDate={(dateString) => new Date(dateString).toLocaleString('zh-CN')}
        />
      </div>

      {/* Role Form Modal */}
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
    </div>
  );
};

export default RoleManagementPage;