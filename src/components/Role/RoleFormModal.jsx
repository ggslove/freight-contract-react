import React from 'react';
import { t } from '../../utils/i18n';

const RoleFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData, 
  isEditMode = false
}) => {
  if (!isOpen) return null;

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
        <h2 style={{ marginTop: 0 }}>
          {isEditMode ? t('system.editRole') : t('system.addRole')}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>{t('system.roleName')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              onChange={(e) => handleInputChange('description', e.target.value)}
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
            onClick={onClose}
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
            onClick={onSubmit}
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
            {isEditMode ? t('system.confirmEdit') : t('system.confirmAdd')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleFormModal;