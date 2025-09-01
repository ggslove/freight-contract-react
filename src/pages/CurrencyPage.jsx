import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import CurrencyStats from '../components/Currency/CurrencyStats';
import CurrencyTable from '../components/Currency/CurrencyTable';
import CurrencyFormModal from '../components/Currency/CurrencyFormModal';

const CurrencyPage = () => {
  const [currencies, setCurrencies] = useState([
    { id: 1, code: 'CNY', name: '人民币', symbol: '￥', isActive: true },
    { id: 2, code: 'USD', name: '美元', symbol: '$', isActive: true },
    { id: 3, code: 'EUR', name: '欧元', symbol: '€', isActive: true },
    { id: 4, code: 'GBP', name: '英镑', symbol: '£', isActive: false },
    { id: 5, code: 'JPY', name: '日元', symbol: '¥', isActive: false }
  ]);
  const [language, setLanguageState] = useState('zh');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    symbol: ''
  });

  const handleAddCurrency = () => {
    if (formData.code && formData.name && formData.symbol) {
      const newCurrency = {
        id: Date.now(),
        ...formData,
        isActive: true
      };
      setCurrencies([...currencies, newCurrency]);
      setFormData({ code: '', name: '', symbol: '' });
      setShowAddModal(false);
    }
  };

  const handleUpdateCurrency = () => {
    if (editingCurrency) {
      setCurrencies(currencies.map(currency => 
        currency.id === editingCurrency.id 
          ? { ...currency, ...formData }
          : currency
      ));
      setEditingCurrency(null);
      setFormData({ code: '', name: '', symbol: '' });
    }
  };

  const handleToggleStatus = (id) => {
    setCurrencies(currencies.map(currency => 
      currency.id === id 
        ? { ...currency, isActive: !currency.isActive }
        : currency
    ));
  };

  const handleDeleteCurrency = (id) => {
    if (window.confirm('确定要删除这个币种吗？')) {
      setCurrencies(currencies.filter(currency => currency.id !== id));
    }
  };

  const openEditModal = (currency) => {
    setEditingCurrency(currency);
    setFormData({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingCurrency(null);
    setFormData({ code: '', name: '', symbol: '' });
  };

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguageState(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('currencies.title')}</h1>
          <p style={{ color: '#666' }}>{t('currencies.subtitle')}</p>
        </div>
    
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#1890ff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(24, 144, 255, 0.2)'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#096dd9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
        >
          <span style={{ fontSize: '16px', lineHeight: '1' }}>+</span>
            {t('currencies.addCurrency')}
        </button>
      </div>

      <CurrencyStats currencies={currencies} />

      <CurrencyTable
        currencies={currencies}
        onToggleStatus={handleToggleStatus}
        onEdit={openEditModal}
        onDelete={handleDeleteCurrency}
      />

      <CurrencyFormModal
        isOpen={showAddModal}
        onClose={closeModal}
        onSubmit={handleAddCurrency}
        formData={formData}
        setFormData={setFormData}
        isEditMode={false}
      />

      <CurrencyFormModal
        isOpen={!!editingCurrency}
        onClose={closeModal}
        onSubmit={handleUpdateCurrency}
        formData={formData}
        setFormData={setFormData}
        isEditMode={true}
      />
    </>
  );
};

export default CurrencyPage;