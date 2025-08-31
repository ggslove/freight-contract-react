import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';

const CurrencyManagementPage = () => {
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
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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

      {/* 统计卡片 */}
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
                {currencies.filter(c => c.isActive).length}
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
                {currencies.filter(c => !c.isActive).length}
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

      {/* 币种列表 */}
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
                      onClick={() => handleToggleStatus(currency.id)}
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
                      onClick={() => openEditModal(currency)}
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
                      onClick={() => handleDeleteCurrency(currency.id)}
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

      {/* 添加/编辑模态框 */}
      {(showAddModal || editingCurrency) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '400px',
            maxWidth: '90%'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>
              {editingCurrency ? '编辑币种' : '添加币种'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>币种代码</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="例如：CNY, USD"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>币种名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例如：人民币"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
              <div>
                <label>货币符号</label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  placeholder="例如：￥, $"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d9d9d9',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d9d9d9',
                  backgroundColor: 'white',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#1890ff'}
                onMouseLeave={(e) => e.target.style.borderColor = '#d9d9d9'}
              >
                取消
              </button>
              <button
                onClick={editingCurrency ? handleUpdateCurrency : handleAddCurrency}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#52c41a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#389e0d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#52c41a'}
              >
                {editingCurrency ? '更新' : '添加'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyManagementPage;