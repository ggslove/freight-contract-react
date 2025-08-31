import React from 'react';
import { Search } from 'lucide-react';
import { t } from '../../utils/i18n';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{
      padding: '1.5rem 2rem',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#fafafa'
    }}>
      <div style={{ position: 'relative', maxWidth: '400px' }}>
        <Search style={{
          position: 'absolute',
          left: '0.75rem',
          top: '0.75rem',
          color: '#9ca3af',
          width: '1.25rem',
          height: '1.25rem'
        }} />
        <input
          type="text"
          placeholder={t('contracts.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;