import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { t } from '../../utils/i18n';

const formatCurrency = (amount, currency = 'CNY') => {
  if (isNaN(amount)) return '¥0.00';
  
  const symbol = currency === 'USD' ? '$' : 
                 currency === 'EUR' ? '€' : 
                 currency === 'GBP' ? '£' : '¥';
  
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
};

const ContractTable = ({ contracts, onEdit, onDelete }) => {
  if (contracts.length === 0) {
    return (
      <div style={{
        padding: '3rem 1rem',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '0.875rem'
      }}>
        {t('contracts.noData')}
      </div>
    );
  }

  return (
    <div style={{
      overflowX: 'auto',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        minWidth: '1200px'
      }}>
        <thead>
          <tr style={{ 
            backgroundColor: '#f8fafc', 
            borderBottom: '1px solid #e2e8f0'
          }}>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              position: 'sticky',
              left: 0,
              backgroundColor: '#f8fafc',
              zIndex: 10,
              minWidth:"120px",
              borderRight: '1px solid #e2e8f0'
            }}>{t('contracts.contractNumber')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '120px'
            }}>{t('contracts.salesman')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '120px'
            }}>{t('contracts.billNumber')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '120px'
            }}>{t('contracts.invoiceNumber')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '150px'
            }}>{t('contracts.customer')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '100px'
            }}>{t('contracts.quantity')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '120px'
            }}>{t('contracts.receiptDate')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '120px'
            }}>{t('contracts.departureDate')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '120px'
            }}>{t('contracts.totalReceivables')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              minWidth: '120px'
            }}>{t('contracts.totalPayables')}</th>
            <th style={{
              padding: '1rem',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151',
              position: 'sticky',
              right: 0,
              backgroundColor: '#f8fafc',
              zIndex: 10,
              borderLeft: '1px solid #e2e8f0',
              minWidth: '100px'
            }}>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={contract.id} style={{ 
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
            }}>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#1f2937',
                fontWeight: '500',
                position: 'sticky',
                left: 0,
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                zIndex: 1,
                borderRight: '1px solid #e5e7eb'
              }}>{contract.businessNo}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#374151' 
              }}>{contract.salesman}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#374151' 
              }}>{contract.blNo}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#374151' 
              }}>{contract.invNo}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#374151' 
              }}>{contract.client}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#374151',
                fontWeight: '500'
              }}>{contract.quantity}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#6b7280' 
              }}>{contract.receiptDate}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#6b7280' 
              }}>{contract.sailDate}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#16a34a',
                fontWeight: '500'
              }}>{formatCurrency(contract.receivables?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0)}</td>
              <td style={{ 
                padding: '1rem', 
                fontSize: '0.875rem', 
                color: '#dc2626',
                fontWeight: '500'
              }}>{formatCurrency(contract.payables?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0)}</td>
              <td style={{ 
                padding: '1rem',
                textAlign: 'center',
                position: 'sticky',
                right: 0,
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                zIndex: 1,
                borderLeft: '1px solid #e5e7eb',
                minWidth: '100px'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => onEdit(contract)}
                    style={{
                      padding: '0.5rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: '#3b82f6',
                      transition: 'all 0.2s ease',
                      borderRadius: '0.25rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#2563eb';
                      e.target.style.backgroundColor = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#3b82f6';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Edit style={{ width: '1.125rem', height: '1.125rem' }} />
                  </button>
                  <button
                    onClick={() => onDelete(contract.id)}
                    style={{
                      padding: '0.5rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: '#ef4444',
                      transition: 'all 0.2s ease',
                      borderRadius: '0.25rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#dc2626';
                      e.target.style.backgroundColor = '#fee2e2';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#ef4444';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Trash2 style={{ width: '1.125rem', height: '1.125rem' }} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;