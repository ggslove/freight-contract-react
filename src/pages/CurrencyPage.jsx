import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import currencyService from '../services/currencyService';
import StatsCard from '../components/ui/StatsCard';
import CurrencyTable from '../components/Currency/CurrencyTable';
import CurrencyForm from '../components/Currency/CurrencyForm';
import showErrorToast from '../utils/errorToast';
import { safeAsync } from '../utils/globalErrorHandler';

const CurrencyPage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);

  const fetchCurrencies = async () => {
    setLoading(true);
    await safeAsync(async () => {
      const data = await currencyService.getAllCurrencies();
      setCurrencies(data);
    }, t('currency.fetchError'));
    setLoading(false);
  };

  // 合并初始加载和语言变化监听
  useEffect(() => {
    fetchCurrencies();

    let languageChangeTimeout;
    const handleLanguageChange = () => {
      // 防抖处理，避免重复调用
      clearTimeout(languageChangeTimeout);
      languageChangeTimeout = setTimeout(() => {
        console.log('🌐 Language change triggered fetchCurrencies');
        fetchCurrencies();
      }, 100);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      clearTimeout(languageChangeTimeout);
    };
  }, []);

  const handleAddCurrency = async (values) => {
    await safeAsync(async () => {
      await currencyService.createCurrency(values);
      setShowModal(false);
      fetchCurrencies();
    }, t('currency.createError'));
  };

  const handleUpdateCurrency = async (values) => {
    if (!editingCurrency) return;
    
    await safeAsync(async () => {
      await currencyService.updateCurrency(editingCurrency.id, values);
      setEditingCurrency(null);
      fetchCurrencies();
    }, t('currency.updateError'));
  };

  const handleToggleStatus = async (currency) => {
    await safeAsync(async () => {
      await currencyService.updateCurrency(currency.id, {
        ...currency,
        isActive: !currency.isActive
      });
      fetchCurrencies();
    }, t('currency.statusUpdateError'));
  };

  const handleDeleteCurrency = async (id) => {
    await safeAsync(async () => {
      await currencyService.deleteCurrency(id);
      fetchCurrencies();
    }, t('currency.deleteError'));
  };

  const openEditModal = async (id) => {
    const currency = await safeAsync(
      () => currencyService.getCurrencyById(id),
      t('currency.fetchError')
    );
    if (currency) {
      setEditingCurrency(currency);
      setShowModal(true);
    }
  };

  const closeForm = () => {
    setShowModal(false);
    setEditingCurrency(null);
  };

  // 计算统计数据
  const activeCurrencies = currencies.filter(c => c.isActive).length;
  const totalCurrencies = currencies.length;
  const cnyCurrencies = currencies.filter(c => c.code === 'CNY').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('currencies.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('currencies.subtitle')}
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('currencies.addCurrency')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title={t('currencies.totalCurrencies')}
          value={totalCurrencies}
          icon="💱"
          change="+2"
          trend="up"
        />
        <StatsCard
          title={t('currencies.activeCurrencies')}
          value={activeCurrencies}
          icon="✅"
          change="+1"
          trend="up"
        />
        <StatsCard
          title={t('currencies.cnyCount')}
          value={cnyCurrencies}
          icon="🇨🇳"
          change="0"
          trend="neutral"
        />
      </div>

      {/* Currency Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('currencies.currencyList')}
          </h3>
        </div>
        <CurrencyTable
          currencies={currencies}
          onToggleStatus={handleToggleStatus}
          onEdit={openEditModal}
          onDelete={handleDeleteCurrency}
        />
      </div>
      
      <CurrencyForm
        onSubmit={editingCurrency ? handleUpdateCurrency : handleAddCurrency}
        isEditMode={!!editingCurrency}
        editingCurrency={editingCurrency}
        onClose={closeForm}
        showModal={showModal}
      />
    </div>
  );
};

export default CurrencyPage;