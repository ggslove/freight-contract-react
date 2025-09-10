import React from 'react';
import { t } from '../../utils/i18n';

const CurrencyTable = ({ currencies, onEdit, onDelete, onToggleStatus, loading }) => {
  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        加载中...
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>币种代码</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>币种名称</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>符号</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>汇率</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>状态</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '1rem', fontWeight: '500' }}>{currency.code}</td>
              <td style={{ padding: '1rem' }}>{currency.name}</td>
              <td style={{ padding: '1rem', fontWeight: '600' }}>{currency.symbol}</td>
              <td style={{ padding: '1rem' }}>{currency.exchangeRate.toFixed(4)}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: currency.isActive ? '#e6f7ff' : '#fff2e8',
                  color: currency.isActive ? '#1890ff' : '#fa8c16',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  {currency.isActive ? '启用' : '禁用'}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onToggleStatus(currency)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      backgroundColor: currency.isActive ? '#ff4d4f' : '#52c41a',
                      color: 'white',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    {currency.isActive ? '禁用' : '启用'}
                  </button>
                  <button
                    onClick={() => onEdit(currency.id)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: '#1890ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#096dd9'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => onDelete(currency.id)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: '#ff4d4f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#cf1322'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4d4f'}
                  >
                    删除
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

export default CurrencyTable;