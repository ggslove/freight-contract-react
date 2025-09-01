import React from 'react';
import { t } from '../../utils/i18n';

const CurrencyFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData, 
  isEditMode = false
}) => {
  if (!isOpen) return null;

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
          {isEditMode ? t('system.editCurrency') : t('system.addCurrency')}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>币种代码</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
              placeholder="如：USD, CNY, EUR"
              maxLength={3}
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
            <label>币种名称</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="如：美元, 人民币, 欧元"
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
            <label>币种符号</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => handleInputChange('symbol', e.target.value)}
              placeholder="如：$, ¥, €"
              maxLength={3}
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
            <label>汇率（对人民币）</label>
            <input
              type="number"
              value={formData.exchangeRate}
              onChange={(e) => handleInputChange('exchangeRate', parseFloat(e.target.value) || 0)}
              step="0.0001"
              min="0"
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
            <label>状态</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={formData.isActive}
                  onChange={() => handleInputChange('isActive', true)}
                />
                <span>启用</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={!formData.isActive}
                  onChange={() => handleInputChange('isActive', false)}
                />
                <span>禁用</span>
              </label>
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

export default CurrencyFormModal;