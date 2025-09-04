import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import currencyService from '../services/currencyService';
import CurrencyStats from '../components/Currency/CurrencyStats';
import CurrencyTable from '../components/Currency/CurrencyTable';
import CurrencyFormModal from '../components/Currency/CurrencyFormModal';

const CurrencyPage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    symbol: '',
    exchangeRate: 1.0,
    isActive: true
  });

  const fetchCurrencies = async () => {
    setLoading(true);
    try {
      const data = await currencyService.getAllCurrencies();
      setCurrencies(data);
    } catch (error) {
      alert(t('currency.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleAddCurrency = async (values) => {
    try {
      await currencyService.createCurrency(values);
      alert(t('currency.createSuccess'));
      setShowAddModal(false);
      setFormData({ code: '', name: '', symbol: '', exchangeRate: 1.0, isActive: true });
      fetchCurrencies();
    } catch (error) {
      alert(error.message || t('currency.createError'));
    }
  };

  const handleUpdateCurrency = async (values) => {
    if (!editingCurrency) return;
    
    try {
      await currencyService.updateCurrency(editingCurrency.id, values);
      alert(t('currency.updateSuccess'));
      setEditingCurrency(null);
      setFormData({ code: '', name: '', symbol: '', exchangeRate: 1.0, isActive: true });
      fetchCurrencies();
    } catch (error) {
      alert(error.message || t('currency.updateError'));
    }
  };

  const handleToggleStatus = async (currency) => {
    try {
      await currencyService.updateCurrency(currency.id, {
        ...currency,
        isActive: !currency.isActive
      });
      alert(t('currency.statusUpdateSuccess'));
      fetchCurrencies();
    } catch (error) {
      alert(t('currency.statusUpdateError'));
    }
  };

  const handleDeleteCurrency = async (id) => {
    try {
      await currencyService.deleteCurrency(id);
      alert(t('currency.deleteSuccess'));
      fetchCurrencies();
    } catch (error) {
      alert(t('currency.deleteError'));
    }
  };

  const openEditModal = (currency) => {
    setEditingCurrency(currency);
    setFormData({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      exchangeRate: currency.exchangeRate,
      isActive: currency.isActive
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingCurrency(null);
    setFormData({ code: '', name: '', symbol: '', exchangeRate: 1.0, isActive: true });
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