import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { t } from '../../utils/i18n';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { 
  modalOverlay, 
  modalContainer, 
  modalHeader, 
  modalCloseButton, 
  formContainer, 
  formGrid, 
  textareaField,
  inputLabel, 
  inputField, 
  selectField, 
  buttonPrimary, 
  buttonSecondary, 
  modalFooter
} from '../../styles/formStyle';
import { CURRENCY_QUERIES } from '../../graphql/queries/currency.queries.js';




const ContractForm = ({ formData, onFormChange, onSubmit, onClose, isEditing, showModal }) => {
  if (!showModal) return null;
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

  const handleFormChange = (changeKV) => {
    onFormChange({ ...formData, ...changeKV});
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
      handleFormChange({receivables: newReceivables });
    } else {
      const newPayables = [...(formData.payables || []), newItem];
      handleFormChange({  payables: newPayables });
    }

    // 清空输入
    setItemName('');
    setItemAmount('');
  };

  const removeItem = (type, id) => {
    if (type === 'receivable') {
      const newReceivables = (formData.receivables || []).filter(item => item.id !== id);
      handleFormChange({ receivables: newReceivables });
    } else {
      const newPayables = (formData.payables || []).filter(item => item.id !== id);
      handleFormChange({ payables: newPayables });
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


  return (
    <div style={modalOverlay}>
      <div style={{
        ...modalContainer,
        maxWidth: '60rem',
        maxHeight: '90vh',
        width: '100%',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={modalHeader}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
            {isEditing ? t('contracts.editContract') : t('contracts.addContract')}
          </h3>
          <button
            onClick={onClose}
            style={modalCloseButton}
          >
            <X style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>
        </div>

        <form onSubmit={onSubmit} style={{
          ...formContainer,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            paddingTop:'0.5rem'
           
          }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <label style={inputLabel}>
                {t('contracts.contractNumber')} *
              </label>
              <input
                type="text"
                value={formData.businessNo}
                onChange={(e) => handleFormChange({businessNo:e.target.value})}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>
                {t('contracts.salesman')} *
              </label>
              <input
                type="text"
                value={formData.salesman}
                onChange={(e) => handleFormChange({salesman: e.target.value})}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>
                {t('contracts.billNumber')} *
              </label>
              <input
                type="text"
                value={formData.billNo}
                onChange={(e) => handleFormChange({billNo:e.target.value})}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>
                {t('contracts.theClient')} *
              </label>
              <input
                type="text"
                value={formData.theClient}
                onChange={(e) => handleFormChange({theClient:e.target.value})}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>
                {t('contracts.quantity')} *
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleFormChange({quantity: e.target.value})}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>
                {t('contracts.status')} *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleFormChange({status: e.target.value})}
                style={selectField}
              >
                <option value="PENDING">{t('contracts.statusPending')}</option>
                <option value="PARTIAL">{t('contracts.statusPartial')}</option>
                <option value="COMPLETED">{t('contracts.statusCompleted')}</option>
                <option value="OVERDUE">{t('contracts.statusOverdue')}</option>
              </select>
            </div>
            <div>
              <label style={inputLabel}>
                {t('contracts.dateOfReceipt')} *
              </label>
              <input
                type="date"
                value={formData.dateOfReceipt}
                onChange={(e) => handleFormChange({dateOfReceipt: e.target.value})}
                style={inputField}
                required
              />
            </div>
            <div>
              <label style={inputLabel}>
                {t('contracts.dateOfSailing')} *
              </label>
              <input
                type="date"
                value={formData.dateOfSailing}
                onChange={(e) => handleFormChange({dateOfSailing: e.target.value})}
                style={inputField}
                required
              />
            </div>

            <div>
              <label style={inputLabel}>
                {t('contracts.invoiceNo')}
              </label>
              <input
                type="text"
                value={formData.invoiceNo}
                onChange={(e) => handleFormChange({invoiceNo: e.target.value})}
                placeholder={t('contracts.optional')}
                style={inputField}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={inputLabel}>
                {t('contracts.remarks')}
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleFormChange({remarks: e.target.value})}
                placeholder={t('contracts.optional')}
                rows="3"
                style={{
                  ...textareaField,
                  width: '100%',
                  minHeight: '80px'
                }}
              />
            </div>
            
          </div>

          {/* 应收应付明细 */}
          <div >
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
                <label style={inputLabel}>
                  {t('contracts.type')}
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  style={selectField}
                >
                  <option value="receivable">{t('contracts.receivables')}</option>
                  <option value="payable">{t('contracts.payables')}</option>
                </select>
              </div>
              
              <div>
                <label style={inputLabel}>
                  {t('contracts.itemDescription')}
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder={t('contracts.enterItemName')}
                  style={inputField}
                />
              </div>
              
              <div>
                <label style={inputLabel}>
                  {t('contracts.itemCurrency')}
                </label>
                <select
                  value={itemCurrency}
                  onChange={(e) => setItemCurrency(e.target.value)}
                  style={selectField}
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
                <label style={inputLabel}>
                  {t('contracts.itemAmount')}
                </label>
                <input
                  type="number"
                  value={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  style={inputField}
                />
              </div>
              
              <button
                type="button"
                onClick={addItem}
                style={buttonPrimary}
              >
                {t('contracts.addItem')}
              </button>
            </div>

            {/* HTML表格样式：币种 | 已收/应收 | 应付/已付 | 类型 | 项目 | 金额 | 操作 */}
            {((formData.receivables && formData.receivables.length > 0) || (formData.payables && formData.payables.length > 0)) && (
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem'
                }}>
                  <thead style={{
                    backgroundColor: '#f8fafc',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    <tr>
                      <th style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #e5e7eb',
                        width: '8%'
                      }}>币种</th>
                      <th style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'right',
                        borderBottom: '1px solid #e5e7eb',
                        width: '12%'
                      }}>已收/应收</th>
                      <th style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'right',
                        borderBottom: '1px solid #e5e7eb',
                        width: '12%'
                      }}>应付/已付</th>
                      <th style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #e5e7eb',
                        width: '10%'
                      }}>类型</th>
                      <th style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #e5e7eb',
                        width: '35%'
                      }}>项目</th>
                      <th style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'right',
                        borderBottom: '1px solid #e5e7eb',
                        width: '15%'
                      }}>金额</th>
                      <th style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'center',
                        borderBottom: '1px solid #e5e7eb',
                        width: '8%'
                      }}>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // 计算每个币种的汇总
                      const currencyTotals = {};
                      
                      // 处理应收
                      formData.receivables?.forEach(item => {
                        const currency = typeof item.currencyCode === 'object' ? item.currencyCode.code : item.currencyCode;
                        if (!currencyTotals[currency]) {
                          currencyTotals[currency] = { receivable: 0, payable: 0 };
                        }
                        currencyTotals[currency].receivable += parseFloat(item.amount) || 0;
                      });
                      
                      // 处理应付
                      formData.payables?.forEach(item => {
                        const currency = typeof item.currencyCode === 'object' ? item.currencyCode.code : item.currencyCode;
                        if (!currencyTotals[currency]) {
                          currencyTotals[currency] = { receivable: 0, payable: 0 };
                        }
                        currencyTotals[currency].payable += parseFloat(item.amount) || 0;
                      });
                      
                      // 合并所有条目并按币种排序
                      const allItems = [];
                      
                      // 添加应收条目
                      formData.receivables?.forEach(item => {
                        const currency = typeof item.currencyCode === 'object' ? item.currencyCode.code : item.currencyCode;
                        allItems.push({
                          ...item,
                          type: 'receivable',
                          typeLabel: t('contracts.receivables'),
                          currency,
                          totals: currencyTotals[currency]
                        });
                      });
                      
                      // 添加应付条目
                      formData.payables?.forEach(item => {
                        const currency = typeof item.currencyCode === 'object' ? item.currencyCode.code : item.currencyCode;
                        allItems.push({
                          ...item,
                          type: 'payable',
                          typeLabel: t('contracts.payables'),
                          currency,
                          totals: currencyTotals[currency]
                        });
                      });
                      
                      // 按币种分组
                      const groupedByCurrency = {};
                      allItems.forEach(item => {
                        if (!groupedByCurrency[item.currency]) {
                          groupedByCurrency[item.currency] = [];
                        }
                        groupedByCurrency[item.currency].push(item);
                      });
                      
                      return Object.entries(groupedByCurrency).map(([currencyCode, items]) => {
                        const totals = items[0].totals;
                        return items.map((item, index) => (
                          <tr key={`${item.type}-${item.id}`} style={{
                            backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafbfc'
                          }}>
                            {/* 币种 - 使用rowspan跨行 */}
                            {index === 0 && (
                              <td rowSpan={items.length} style={{
                                padding: '0.5rem 1rem',
                                borderTop: '1px solid #e5e7eb',
                                fontWeight: '600',
                                color: '#374151',
                                verticalAlign: 'center',
                                backgroundColor: '#f8fafc'
                              }}>
                                {currencyCode}
                              </td>
                            )}
                            
                            {/* 已收/应收 - 使用rowspan跨行 */}
                            {index === 0 && (
                              <td rowSpan={items.length} style={{
                                padding: '0.5rem 1rem',
                                textAlign: 'right',
                                borderTop: '1px solid #e5e7eb',
                                color: '#059669',
                                fontWeight: '600',
                                verticalAlign: 'center',
                                backgroundColor: '#f8fafc'
                              }}>
                                {formatCurrency(totals.receivable, currencyCode)}
                              </td>
                            )}
                            {/* 应付/已付 - 使用rowspan跨行 */}
                            {index === 0 && (
                              <td rowSpan={items.length} style={{
                                padding: '0.5rem 1rem',
                                textAlign: 'right',
                                borderTop: '1px solid #e5e7eb',
                                color: '#dc2626',
                                fontWeight: '600',
                                verticalAlign: 'center',
                                backgroundColor: '#f8fafc'
                              }}>
                                {formatCurrency(totals.payable, currencyCode)}
                              </td>
                            )}
                            
                            {/* 类型 */}
                            <td style={{
                              padding: '0.5rem 1rem',
                              borderTop: '1px solid #e5e7eb',
                              color: item.type === 'receivable' ? '#059669' : '#dc2626',
                              fontWeight: '500'
                            }}>
                              {item.typeLabel}
                            </td>
                            
                            {/* 项目 */}
                            <td style={{
                              padding: '0.5rem 1rem',
                              borderTop: '1px solid #e5e7eb',
                              color: '#374151'
                            }}>
                              {item.financeItem}
                            </td>
                            
                            {/* 金额 */}
                            <td style={{
                              padding: '0.5rem 1rem',
                              textAlign: 'right',
                              borderTop: '1px solid #e5e7eb',
                              fontWeight: '500',
                              color: '#374151'
                            }}>
                              {formatCurrency(item.amount, currencyCode)}
                            </td>
                            
                            {/* 操作 */}
                            <td style={{
                              padding: '0.5rem 1rem',
                              textAlign: 'center',
                              borderTop: '1px solid #e5e7eb'
                            }}>
                              <button
                                type="button"
                                onClick={() => removeItem(item.type, item.id)}
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
                            </td>
                          </tr>
                        ));
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          </div>

          <div style={{
            ...modalFooter,
            backgroundColor: 'white',
            borderTop: '1px solid #e5e7eb',
            padding: '1rem 1.5rem',
            marginTop: 0
          }}>
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
              {isEditing ? t('contracts.update') : t('contracts.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;