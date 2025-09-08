import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { t } from '../../utils/i18n';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { CURRENCY_QUERIES } from '../../graphql/queries/currency.queries.js';

const ContractForm = ({ formData, onFormChange, onSubmit, onClose, isEditing, showModal }) => {
  const [itemType, setItemType] = useState('receivable');
  const [itemName, setItemName] = useState('');
  const [itemCurrency, setItemCurrency] = useState('CNY');
  const [itemAmount, setItemAmount] = useState('');
  const {GET_ACTIVE_CURRENCIES}=CURRENCY_QUERIES;
  const { data: currenciesData, loading: currenciesLoading } = useQuery(gql(GET_ACTIVE_CURRENCIES));

  // 确保组件在showModal为true时才渲染
  if (!showModal) {
    return null;
  }

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const addItem = () => {
    if (!itemName.trim() || !itemAmount) return;

    const newItem = {
      id: Date.now(),
      financeItem: itemName.trim(),
      currencyCode: itemCurrency || 'CNY', // 确保货币有默认值
      amount: parseFloat(itemAmount),
      type: itemType,
      status: 'PENDING'
    };

    if (itemType === 'receivable') {
      const newReceivables = [...(formData.receivables || []), newItem];
      onFormChange({ ...formData, receivables: newReceivables });
    } else {
      const newPayables = [...(formData.payables || []), newItem];
      onFormChange({ ...formData, payables: newPayables });
    }

    // 清空输入
    setItemName('');
    setItemAmount('');
  };

  const removeItem = (type, id) => {
    if (type === 'receivable') {
      const newReceivables = (formData.receivables || []).filter(item => item.id !== id);
      onFormChange({ ...formData, receivables: newReceivables });
    } else {
      const newPayables = (formData.payables || []).filter(item => item.id !== id);
      onFormChange({ ...formData, payables: newPayables });
    }
  };

  const updateItemStatus = (type, id, newStatus) => {
    if (type === 'receivable') {
      const newReceivables = (formData.receivables || []).map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      onFormChange({ ...formData, receivables: newReceivables });
    } else {
      const newPayables = (formData.payables || []).map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      onFormChange({ ...formData, payables: newPayables });
    }
  };

  const formatCurrency = (amount, currency = 'CNY') => {
    if (isNaN(amount) || amount === null || amount === undefined) return '¥0.00';
    
    // 处理货币可能是对象的情况
    const currencyCode = typeof currency === 'object' ? currency.code : currency;
    
    const currencyInfo = currenciesData?.activeCurrencies?.find(c => c.code === currencyCode);
    const symbol = currencyInfo?.symbol ||
                   currencyCode === 'USD' ? '$' :
                   currencyCode === 'EUR' ? '€' :
                   currencyCode === 'GBP' ? '£' : '¥';
    
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
                value={formData.billNo}
                onChange={(e) => handleInputChange('billNo', e.target.value)}
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
                {t('contracts.theClient')} *
              </label>
              <input
                type="text"
                value={formData.theClient}
                onChange={(e) => handleInputChange('theClient', e.target.value)}
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
                type="text"
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
                {t('contracts.status')} *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              >
                <option value="PENDING">{t('contracts.statusPending')}</option>
                <option value="PARTIAL">{t('contracts.statusPartial')}</option>
                <option value="COMPLETED">{t('contracts.statusCompleted')}</option>
                <option value="OVERDUE">{t('contracts.statusOverdue')}</option>
              </select>
            </div>



            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.dateOfReceipt')} *
              </label>
              <input
                type="date"
                value={formData.dateOfReceipt}
                onChange={(e) => handleInputChange('dateOfReceipt', e.target.value)}
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
                {t('contracts.dateOfSailing')} *
              </label>
              <input
                type="date"
                value={formData.dateOfSailing}
                onChange={(e) => handleInputChange('dateOfSailing', e.target.value)}
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
                {t('contracts.invoiceNo')}
              </label>
              <input
                type="text"
                value={formData.invoiceNo}
                onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
                placeholder={t('contracts.optional')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {t('contracts.remarks')}
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                placeholder={t('contracts.optional')}
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  resize: 'vertical'
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
                  disabled={currenciesLoading}
                >
                  {currenciesLoading ? (
                    <option value="">{t('common.loading')}...</option>
                  ) : (
                    currenciesData?.activeCurrencies?.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))
                  )}
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
            {((formData.receivables && formData.receivables.length > 0) || (formData.payables && formData.payables.length > 0)) && (
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
                
                {formData.receivables && formData.receivables.map((item) => (
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
                    <div style={{ color: '#374151' }}>{item.financeItem}</div>
                    <div style={{ color: '#374151' }}>{typeof item.currencyCode === 'object' ? item.currencyCode.code : item.currencyCode}</div>
                    <div style={{ textAlign: 'right', fontWeight: '500' }}>
                      {formatCurrency(item.amount, item.currencyCode)}
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
                
                {formData.payables && formData.payables.map((item) => (
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
                    <div style={{ color: '#374151' }}>{item.financeItem}</div>
                    <div style={{ color: '#374151' }}>{typeof item.currencyCode === 'object' ? item.currencyCode.code : item.currencyCode}</div>
                    <div style={{ textAlign: 'right', fontWeight: '500' }}>
                      {formatCurrency(item.amount, item.currencyCode)}
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