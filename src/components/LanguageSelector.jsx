import React from 'react';
import { getCurrentLanguage, setLanguage, getSupportedLanguages } from '../utils/i18n';

const LanguageSelector = () => {
  const currentLang = getCurrentLanguage();
  const languages = getSupportedLanguages();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      <select 
        value={currentLang}
        onChange={handleLanguageChange}
        style={{
          padding: '0.375rem 2rem 0.375rem 0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          backgroundColor: 'white',
          fontSize: '0.875rem',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          minWidth: '100px',
          color: '#374151'
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;