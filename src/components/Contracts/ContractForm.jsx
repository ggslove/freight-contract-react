import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { t } from '../../utils/i18n';

const ContractForm = ({ formData, onFormChange, onSubmit, onClose, isEditing, showModal }) => {
  const [itemType, setItemType] = useState('receivable');
  const [itemName, setItemName] = useState('');
  const [itemCurrency, setItemCurrency] = useState('CNY');
  const [itemAmount, setItemAmount] = useState('');

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const addItem = () => {
    if (!itemName.trim() || !itemAmount) return;

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      currency: itemCurrency || 'CNY', // 确保货币有默认值
      amount: parseFloat(itemAmount),
      type: itemType,
      status: '待确认'
    };

    if (itemType === 'receivable') {
      const newReceivables = [...(formData.receivableItems || []), newItem];
      onFormChange({ ...formData, receivableItems: newReceivables });
    } else {
      const newPayables = [...(formData.payableItems || []), newItem];
      onFormChange({ ...formData, payableItems: newPayables });
    }

    // 清空输入
    setItemName('');
    setItemAmount('');
  };

  const removeItem = (type, id) => {
    if (type === 'receivable') {
      const newReceivables = (formData.receivableItems || []).filter(item => item.id !== id);
      onFormChange({ ...formData, receivableItems: newReceivables });
    } else {
      const newPayables = (formData.payableItems || []).filter(item => item.id !== id);
      onFormChange({ ...formData, payableItems: newPayables });
    }
  };

  const updateItemStatus = (type, id, newStatus) => {
    if (type === 'receivable') {
      const newReceivables = (formData.receivableItems || []).map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      onFormChange({ ...formData, receivableItems: newReceivables });
    } else {
      const newPayables = (formData.payableItems || []).map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      onFormChange({ ...formData, payableItems: newPayables });
    }
  };

  const formatCurrency = (amount, currency = 'CNY') => {
    if (isNaN(amount)) return '¥0.00';
    
    const symbol = currency === 'USD' ? '$' : 
                   currency === 'EUR' ? '€' : 
                   currency === 'GBP' ? '£' : '¥';
    
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  };

  if (!showModal) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '60rem',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
            {isEditing ? t('contracts.editContract') : t('contracts.addContract')}
          </h3>
          <button
            onClick={onClose}
            style={{
              color: '#6b7280',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            <X style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.contractNumber')} *
              </label>
              <input
                type="text"
                value={formData.businessNo}
                onChange={(e) => handleInputChange('businessNo', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.salesman')} *
              </label>
              <input
                type="text"
                value={formData.salesman}
                onChange={(e) => handleInputChange('salesman', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.billNumber')} *
              </label>
              <input
                type="text"
                value={formData.blNo}
                onChange={(e) => handleInputChange('blNo', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.invoiceNumber')} *
              </label>
              <input
                type="text"
                value={formData.invNo}
                onChange={(e) => handleInputChange('invNo', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.customer')} *
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.quantity')} *
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>



            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.receiptDate')} *
              </label>
              <input
                type="date"
                value={formData.receiptDate}
                onChange={(e) => handleInputChange('receiptDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.departureDate')} *
              </label>
              <input
                type="date"
                value={formData.sailDate}
                onChange={(e) => handleInputChange('sailDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.taxNumber')}
              </label>
              <input
                type="text"
                value={formData.taxNumber || ''}
                onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          {/* 应收应付明细 */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>{t('contracts.receivablesPayables')}</h4>
            
            {/* 添加新项目 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
              gap: '0.5rem',
              alignItems: 'end',
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.375rem'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                  {t('contracts.type')}
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="receivable">{t('contracts.receivables')}</option>
                  <option value="payable">{t('contracts.payables')}</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                  {t('contracts.itemDescription')}
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder={t('contracts.enterItemName')}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                  {t('contracts.itemCurrency')}
                </label>
                <select
                  value={itemCurrency}
                  onChange={(e) => setItemCurrency(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="CNY">CNY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                  {t('contracts.itemAmount')}
                </label>
                <input
                  type="number"
                  value={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              
              <button
                type="button"
                onClick={addItem}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  alignSelf: 'end'
                }}
              >
                {t('contracts.addItem')}
              </button>
            </div>

            {/* 明细列表 */}
            {((formData.receivableItems && formData.receivableItems.length > 0) || (formData.payableItems && formData.payableItems.length > 0)) && (
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  <div>{t('contracts.type')}</div>
                  <div>{t('contracts.itemDescription')}</div>
                  <div>{t('contracts.itemCurrency')}</div>
                  <div style={{ textAlign: 'right' }}>{t('contracts.itemAmount')}</div>
                  <div style={{ width: '60px' }}></div>
                </div>
                
                {formData.receivableItems && formData.receivableItems.map((item) => (
                  <div key={item.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid #e5e7eb',
                    alignItems: 'center',
                    fontSize: '0.875rem'
                  }}>
                    <div style={{ color: '#374151' }}>
                      {t('contracts.receivables')}
                    </div>
                    <div style={{ color: '#374151' }}>{item.name}</div>
                    <div style={{ color: '#374151' }}>{item.currency}</div>
                    <div style={{ textAlign: 'right', fontWeight: '500' }}>
                      {formatCurrency(item.amount, item.currency)}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => removeItem('receivable', item.id)}
                        style={{
                          padding: '0.25rem',
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                        title={t('contracts.delete')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {formData.payableItems && formData.payableItems.map((item) => (
                  <div key={item.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid #e5e7eb',
                    alignItems: 'center',
                    fontSize: '0.875rem'
                  }}>
                    <div style={{ color: '#374151' }}>
                      {t('contracts.payables')}
                    </div>
                    <div style={{ color: '#374151' }}>{item.name}</div>
                    <div style={{ color: '#374151' }}>{item.currency}</div>
                    <div style={{ textAlign: 'right', fontWeight: '500' }}>
                      {formatCurrency(item.amount, item.currency)}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => removeItem('payable', item.id)}
                        style={{
                          padding: '0.25rem',
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                        title={t('contracts.delete')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: 'white',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.375rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              {isEditing ? t('contracts.update') : t('contracts.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;