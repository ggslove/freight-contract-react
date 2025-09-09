import React from 'react';
import { t } from '../../utils/i18n';

import { 
  modalOverlay, 
  modalContainer, 
  modalHeader, 
  modalFooter,
  modalCloseButton, 
  formContainer, 
  formGrid, 
  inputLabel, 
  inputField, 
  selectField, 
  buttonPrimary, 
  buttonSecondary 
} from '../../styles/formStyle';

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
    { value: 'ADMIN', label: t('users.systemAdmin') },
    { value: 'MANAGER', label: t('users.businessManager') },
    { value: 'FINANCE', label: t('users.financeStaff') },
    { value: 'USER', label: t('users.normalUser') }
  ];

  const statusOptions = [
    { value: 'ENABLED', label: t('common.enabled') },
    { value: 'DISABLED', label: t('common.disabled') }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        <div style={modalHeader}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>
            {isEditMode ? t('users.editUser') : t('users.addUser')}
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

        <form onSubmit={onSubmit} style={formContainer}>
          <div style={formGrid}>
          <div>
            <label style={inputLabel}>
              {t('users.username')}
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              style={inputField}
            />
          </div>
          
          <div>
            <label style={inputLabel}>
              {t('users.realName')}
            </label>
            <input
              type="text"
              value={formData.realName}
              onChange={(e) => handleInputChange('realName', e.target.value)}
              style={inputField}
            />
          </div>
          
          <div>
            <label style={inputLabel}>
              {t('users.email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={inputField}
            />
          </div>
          
          <div>
            <label style={inputLabel}>
              {t('users.phone')}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              style={inputField}
            />
          </div>
          
          <div>
            <label style={inputLabel}>
              {t('users.role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              style={selectField}
            >
              <option value="">{t('users.selectRole')}</option>
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={inputLabel}>
              {t('users.status')}
            </label>
            <select
              value={formData.status || 'ENABLED'}
              onChange={(e) => handleInputChange('status', e.target.value)}
              style={selectField}
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          
          {!isEditMode && (
            <>
              <div>
                <label style={inputLabel}>
                  {t('users.password')}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  style={inputField}
                />
              </div>
              
              <div>
                <label style={inputLabel}>
                  {t('users.confirmPassword')}
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  style={inputField}
                />
              </div>
            </>
          )}
          
          {isEditMode && (
            <div>
              <label style={inputLabel}>
                {t('users.newPassword')} ({t('users.optional')})
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={inputField}
              />
            </div>
          )}
        </div>
        
        <div style={modalFooter}>
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
          >
            {isEditMode ? t('users.confirmEdit') : t('users.confirmAdd')}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;