import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import { Plus } from 'lucide-react';
import { services } from '../services'; // 使用包装后的服务
import { safeAsync, showSuccess } from '../utils/globalErrorHandler';
import RoleTable from '../components/Role/RoleTable';
import RoleForm from '../components/Role/RoleForm';
import RoleStats from '../components/Role/RoleStats';
import ErrorBoundary from '../components/ErrorBoundary';

const RoleManagementPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // 获取角色列表 - 使用全局错误处理
  const fetchRoles = async () => {
    setLoading(true);
    const data = await services.role.getAllRoles();
    setRoles(data);
    setLoading(false);
  };

  // 初始加载
  useEffect(() => {
    fetchRoles();
  }, []);

  // 创建角色
  const handleAddRole = async (roleData) => {
    const newRole = await services.role.createRole(roleData);
    setRoles([...roles, newRole]);
    setShowForm(false);
    showSuccess('角色创建成功');
  };

  // 更新角色
  const handleEditRole = async (roleData) => {
    const updatedRole = await services.role.updateRole(selectedRole.id, roleData);
    setRoles(roles.map(role => role.id === selectedRole.id ? updatedRole : role));
    setShowForm(false);
    setSelectedRole(null);
    showSuccess('角色更新成功');
  };

  // 删除角色
  const handleDeleteRole = async (id) => {
    const role = roles.find(r => r.id === id);
    if (role.isSystem) {
      throw new Error('系统预置角色不能删除');
    }
    if (role.userCount > 0) {
      throw new Error('该角色下还有用户，不能删除');
    }

    if (window.confirm('确定要删除该角色吗？')) {
      await services.role.deleteRole(id);
      setRoles(roles.filter(role => role.id !== id));
      showSuccess('角色删除成功');
    }
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setIsEditMode(true);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600 dark:text-gray-400">加载中...</div>
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
          onClick={() => { setShowForm(true); setIsEditMode(false); setSelectedRole(null); }}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <Plus size={16} className="mr-2" />
          {t('system.addRole')}
        </button>
      </div>

      {/* Stats Cards */}
      <RoleStats roles={roles} />

      {/* Role Table */}
      <ErrorBoundary>
        <RoleTable
          roles={roles}
          onEdit={openEditModal}
          onDelete={handleDeleteRole}
        />
      </ErrorBoundary>

      {/* Role Form */}
      <ErrorBoundary>
        <RoleForm
          isOpen={showForm}
          onClose={() => { setShowForm(false); setSelectedRole(null); }}
          onSubmit={isEditMode ? handleEditRole : handleAddRole}
          editingRole={selectedRole}
          isEditMode={isEditMode}
        />
      </ErrorBoundary>
    </div>
  );
};

export default RoleManagementPage;