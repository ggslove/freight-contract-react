import React, { useState, useEffect } from 'react';
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
  selectField, 
  buttonPrimary, 
  buttonSecondary ,
  textareaField
} from '../../styles/formStyle';

const CurrencyForm = ({ 
  onClose, 
  onSubmit, 
  isEditMode = false,
  editingCurrency = null,
  showModal = false,
  loading = false
}) => {
  
  // 使用函数式初始化避免重复渲染
  const [formData, setFormData] = useState(() => ({
    code: '',
    name: '',
    symbol: '',
    exchangeRate: 1.0,
    isActive: true
  }));

  // 优化useEffect，避免不必要的重新渲染
  useEffect(() => {
    if (!showModal) return;
    
    if (isEditMode && editingCurrency) {
      setFormData({
        code: editingCurrency.code || '',
        name: editingCurrency.name || '',
        symbol: editingCurrency.symbol || '',
        exchangeRate: editingCurrency.exchangeRate || 1.0,
        isActive: editingCurrency.isActive !== undefined ? editingCurrency.isActive : true
      });
    } else if (!isEditMode && showModal) {
      setFormData({
        code: '',
        name: '',
        symbol: '',
        exchangeRate: 1.0,
        isActive: true
      });
    }
  }, [isEditMode, editingCurrency, showModal]);

  if (!showModal) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'exchangeRate' || name === 'decimalPlaces' ? parseFloat(value) : 
               name === 'isActive' ? (value === 'true') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        <div style={modalHeader}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>
            {isEditMode ? t('currency.editCurrency') : t('currency.addCurrency')}
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
              <label style={inputLabel}>{t('currency.code')}</label>
              <input
                type="text"
                name="code"
                value={formData.code || ''}
                onChange={handleChange}
                style={inputField}
                required
                maxLength="3"
              />
            </div>

            <div>
              <label style={inputLabel}>{t('currency.name')}</label>
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
              <label style={inputLabel}>{t('currency.symbol')}</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol || ''}
                onChange={handleChange}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>{t('currency.exchangeRate')}</label>
              <input
                type="number"
                name="exchangeRate"
                value={formData.exchangeRate || ''}
                onChange={handleChange}
                style={inputField}
                required
                min="0"
                step="0.0001"
              />
            </div>
           

            <div>
              <label style={inputLabel}>{t('currency.isActive')}</label>
              <select
                name="isActive"
                value={formData.isActive ? 'true' : 'false'}
                onChange={handleChange}
                style={selectField}
              >
                <option value="true">{t('common.yes')}</option>
                <option value="false">{t('common.no')}</option>
              </select>
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

export default CurrencyForm;