import React from 'react';
import { t } from '../../utils/i18n';
import { 
  modalOverlay, 
  modalContainer, 
  modalHeader, 
  modalCloseButton, 
  formContainer, 
  formGrid, 
  inputLabel, 
  inputField, 
  textareaField, 
  buttonPrimary, 
  buttonSecondary 
} from '../../styles/formStyle';

const RoleForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData, 
  isEditMode = false,
  permissions = [],
  loading = false
}) => {

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId) => {
    const permissions = formData.permissions?.includes(permissionId)
      ? formData.permissions.filter(id => id !== permissionId)
      : [...(formData.permissions || []), permissionId];
    setFormData(prev => ({ ...prev, permissions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const allPermissions = [
    '系统管理', '用户管理', '角色管理', '合同管理', '财务管理',
    '币种管理', '客户管理', '报表查看', '数据导出', '系统配置',
    '合同创建', '合同编辑', '合同删除', '合同审核', '付款管理',
    '收款管理', '发票管理', '统计分析', '日志查看'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePermission = (permission) => {
    const permissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    handleInputChange('permissions', permissions);
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        <div style={modalHeader}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>
            {isEditMode ? t('role.editRole') : t('role.addRole')}
          </h3>
          <button
            onClick={onClose}
            style={modalCloseButton}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={formContainer}>
          <div style={formGrid}>
            <div>
              <label style={inputLabel}>{t('role.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>{t('role.code')}</label>
              <input
                type="text"
                name="code"
                value={formData.code || ''}
                onChange={handleChange}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>{t('role.level')}</label>
              <input
                type="number"
                name="level"
                value={formData.level || ''}
                onChange={handleChange}
                style={inputField}
                required
                min="1"
                max="100"
              />
            </div>

            <div>
              <label style={inputLabel}>{t('role.status')}</label>
              <select
                name="status"
                value={formData.status || 'ACTIVE'}
                onChange={handleChange}
                style={inputField}
              >
                <option value="ACTIVE">{t('common.active')}</option>
                <option value="INACTIVE">{t('common.inactive')}</option>
              </select>
            </div>
          </div>

          <div>
            <label style={inputLabel}>{t('role.description')}</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              style={textareaField}
              rows="3"
            />
          </div>

          <div>
            <label style={inputLabel}>{t('role.permissions')}</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '0.75rem',
              marginTop: '0.5rem'
            }}>
              {permissions.map(permission => (
                <label key={permission.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.permissions?.includes(permission.id) || false}
                    onChange={() => handlePermissionChange(permission.id)}
                    style={{ margin: 0 }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>{permission.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={buttonSecondary}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              style={buttonPrimary}
              disabled={loading}
            >
              {loading ? t('common.saving') : (isEditMode ? t('common.update') : t('common.add'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;