import React from 'react';
import { Plus } from 'lucide-react';
import { t } from '../../utils/i18n';

const ContractHeader = ({ onAddClick }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <div></div>
      <button
        onClick={onAddClick}
        style={{
          backgroundColor: '#1890ff',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(24, 144, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#096dd9'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
      >
        <Plus style={{ width: '1.25rem', height: '1.25rem' }} />
        {t('contracts.addContract')}
      </button>
    </div>
  );
};

export default ContractHeader;