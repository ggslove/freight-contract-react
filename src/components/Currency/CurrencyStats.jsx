import React from 'react';
import { t } from '../../utils/i18n';

const CurrencyStats = ({ currencies }) => {
  const activeCurrencies = currencies.filter(c => c.isActive).length;
  const disabledCurrencies = currencies.filter(c => !c.isActive).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>总币种数</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currencies.length}</h2>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#e6f7ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#1890ff'
          }}>
            ¥
          </div>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>启用币种</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>
              {activeCurrencies}
            </h2>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#f6ffed',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#52c41a'
          }}>
            ✓
          </div>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>禁用币种</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff4d4f' }}>
              {disabledCurrencies}
            </h2>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#fff2f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#ff4d4f'
          }}>
            ✕
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyStats;