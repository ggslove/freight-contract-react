import React, { useState, useEffect } from 'react';
import { getCurrentLanguage } from '../utils/i18n';

const LanguageWrapper = ({ children }) => {
  const [language, setLanguageState] = useState(getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguageState(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  return <div key={language}>{children}</div>;
};

export default LanguageWrapper;