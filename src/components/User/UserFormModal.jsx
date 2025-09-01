import React from 'react';
import { t } from '../../utils/i18n';

const UserFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData, 
  isEditMode = false,
  roles
}) => {
  if (!isOpen) return null;

  const roleOptions = [
    { value: 'SUPER_ADMIN', label: t('users.superAdmin') },
    { value: 'SYSTEM_ADMIN', label: t('users.systemAdmin') },
    { value: 'BUSINESS_MANAGER', label: t('users.businessManager') },
    { value: 'FINANCE_STAFF', label: t('users.financeStaff') },
    { value: 'NORMAL_USER', label: t('users.normalUser') }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          {isEditMode ? t('users.editUser') : t('users.addUser')}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>{t('users.username')}</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
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
              onChange={(e) => handleInputChange('realName', e.target.value)}
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
              onChange={(e) => handleInputChange('email', e.target.value)}
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
              onChange={(e) => handleInputChange('phone', e.target.value)}
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
              onChange={(e) => handleInputChange('role', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d9d9d9',
                borderRadius: '0.25rem',
                marginTop: '0.25rem'
              }}
            >
              <option value="">{t('users.selectRole')}</option>
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          
          {!isEditMode && (
            <>
              <div>
                <label>{t('users.password')}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
            </>
          )}
          
          {isEditMode && (
            <div>
              <label>{t('users.newPassword')} ({t('users.optional')})</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d9d9d9',
                  borderRadius: '0.25rem',
                  marginTop: '0.25rem'
                }}
              />
            </div>
          )}
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
            {isEditMode ? t('users.confirmEdit') : t('users.confirmAdd')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;