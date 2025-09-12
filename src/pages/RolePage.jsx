import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import roleService from '../services/roleService';
import RoleTable from '../components/Role/RoleTable';
import RoleForm from '../components/Role/RoleForm';
import RoleStats from '../components/Role/RoleStats';
import { safeAsync } from '../utils/globalErrorHandler';

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await roleService.getAllRoles();
      setRoles(data);
    } catch (error) {
      console.error('获取角色列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();

    // 监听语言变化
    const handleLanguageChange = () => {
      console.log('🌐 Language change triggered fetchRoles');
      fetchRoles();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleAddRole = async (values) => {
    await safeAsync(async () => {
      await roleService.createRole(values);
      setShowModal(false);
      fetchRoles();
    }, t('role.createError'));
  };

  const handleUpdateRole = async (values) => {
    if (!editingRole) return;
    
    await safeAsync(async () => {
      await roleService.updateRole(editingRole.id, values);
      setEditingRole(null);
      setShowModal(false);
      fetchRoles();
    }, t('role.updateError'));
  };

  const handleDeleteRole = async (id) => {
    await safeAsync(async () => {
      await roleService.deleteRole(id);
      fetchRoles();
    }, t('role.deleteError'));
  };

  const openEditModal = async (role) => {
    const roleData = await safeAsync(
      () => roleService.getRoleById(role.id),
      t('role.fetchError')
    );
    if (roleData) {
      setEditingRole(roleData);
      setShowModal(true);
    }
  };

  const closeForm = () => {
    setShowModal(false);
    setEditingRole(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('roles.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('roles.subtitle')}
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('roles.addRole')}
        </button>
      </div>

      {/* Stats Cards */}
      <RoleStats roles={roles} />

      {/* Role Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('roles.roleList')}
          </h3>
        </div>
        <RoleTable
          roles={roles}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDeleteRole}
        />
      </div>

      <RoleForm
        onSubmit={editingRole ? handleUpdateRole : handleAddRole}
        isEditMode={!!editingRole}
        editingRole={editingRole}
        onClose={closeForm}
        showModal={showModal}
      />
    </div>
  );
};

export default RolePage;