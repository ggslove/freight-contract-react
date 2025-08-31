import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { t } from '../utils/i18n';

const formatCurrency = (amount, currency = 'CNY') => {
  if (isNaN(amount)) return '¥0.00';
  
  const symbol = currency === 'USD' ? '$' : 
                 currency === 'EUR' ? '€' : 
                 currency === 'GBP' ? '£' : '¥';
  
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
};

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [language, setLanguageState] = useState('zh');
  const [formData, setFormData] = useState({
    businessNo: '',
    salesman: '',
    blNo: '',
    invNo: '',
    client: '',
    quantity: '',
    receiptDate: '',
    sailDate: '',
    taxNumber: '',
    receivableItems: [],
    payableItems: []
  });

  useEffect(() => {
    setContracts([
      {
        id: 1,
        businessNo: 'HT2024001',
        salesman: '张三',
        blNo: 'BL123456789',
        invNo: 'INV2024001',
        client: 'ABC国际贸易公司',
        quantity: '100',
        receiptDate: '2024-01-10',
        sailDate: '2024-01-15',
        currency: 'CNY',
        status: '进行中',
        receivableItems: [
          { id: 1, name: '海运费', currency: 'CNY', amount: 5000 },
          { id: 2, name: '港口费', currency: 'CNY', amount: 1500 }
        ],
        payableItems: [
          { id: 1, name: '代理费', currency: 'CNY', amount: 2000 },
          { id: 2, name: '文件费', currency: 'CNY', amount: 300 }
        ]
      },
      {
        id: 2,
        businessNo: 'HT2024002',
        salesman: '李四',
        blNo: 'BL987654321',
        invNo: 'INV2024002',
        client: 'XYZ物流公司',
        quantity: '200',
        receiptDate: '2024-01-12',
        sailDate: '2024-01-20',
        currency: 'USD',
        status: '已完成',
        receivableItems: [
          { id: 3, name: '海运费', currency: 'USD', amount: 3000 },
          { id: 4, name: '保险费', currency: 'USD', amount: 500 }
        ],
        payableItems: [
          { id: 3, name: '船公司费用', currency: 'USD', amount: 2500 }
        ]
      }
    ]);
  }, [language]);

  // 监听语言变化
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguageState(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContract) {
      setContracts(contracts.map(c => 
        c.id === editingContract.id ? { ...formData, id: editingContract.id } : c
      ));
    } else {
      setContracts([...contracts, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingContract(null);
    setFormData({
      businessNo: '',
      salesman: '',
      blNo: '',
      invNo: '',
      client: '',
      quantity: '',
      receiptDate: '',
      sailDate: '',
      taxNumber: '',
      receivableItems: [],
      payableItems: []
    });
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setFormData({
      businessNo: contract.businessNo || '',
      salesman: contract.salesman || '',
      blNo: contract.blNo || '',
      invNo: contract.invNo || '',
      client: contract.client || '',
      quantity: contract.quantity || '',
      receiptDate: contract.receiptDate || '',
      sailDate: contract.sailDate || '',
      taxNumber: contract.taxNumber || '',
      receivableItems: contract.receivableItems || [],
      payableItems: contract.payableItems || []
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('contracts.confirmDelete'))) {
      setContracts(contracts.filter(c => c.id !== id));
    }
  };

  const filteredContracts = contracts.filter(contract =>
    contract.businessNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.blNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.salesman.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        {/* 头部 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div></div>
          <button
            onClick={() => {
              setEditingContract(null);
              setFormData({
                businessNo: '',
                salesman: '',
                blNo: '',
                invNo: '',
                client: '',
                quantity: '',
                receiptDate: '',
                sailDate: '',
                taxNumber: '',
                receivableItems: [],
                payableItems: []
              });
              setShowModal(true);
            }}
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
        
        {/* 搜索区域 */}
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
              onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* 表格区域 */}
        <div style={{ padding: '0' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: '#f8fafc', 
                  borderBottom: '2px solid #e2e8f0' 
                }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.contractNumber')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.salesman')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.billNumber')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>发票号</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.customer')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.quantity')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.currency')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.receiptDate')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.departureDate')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.totalReceivables')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('contracts.totalPayables')}</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{
                      padding: '3rem 1rem',
                      textAlign: 'center',
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      {searchTerm ? t('common.noData') : t('contracts.noData')}
                    </td>
                  </tr>
                ) : (
                  filteredContracts.map((contract, index) => (
                    <tr key={contract.id} style={{ 
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                    }}>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#1f2937',
                        fontWeight: '500'
                      }}>{contract.businessNo}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#374151' 
                      }}>{contract.salesman}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#374151' 
                      }}>{contract.blNo}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#374151' 
                      }}>{contract.invNo}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#374151' 
                      }}>{contract.client}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#374151',
                        fontWeight: '500'
                      }}>{contract.quantity}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#374151',
                        fontWeight: '500'
                      }}>{contract.currency || 'CNY'}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#6b7280' 
                      }}>{contract.receiptDate}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#6b7280' 
                      }}>{contract.sailDate}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#16a34a',
                        fontWeight: '500'
                      }}>{formatCurrency(contract.receivableItems?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0)}</td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#dc2626',
                        fontWeight: '500'
                      }}>{formatCurrency(contract.payableItems?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0)}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleEdit(contract)}
                            style={{
                              padding: '0.5rem',
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: '#3b82f6',
                              transition: 'all 0.2s ease',
                              borderRadius: '0.25rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = '#2563eb';
                              e.target.style.backgroundColor = '#eff6ff';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = '#3b82f6';
                              e.target.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Edit style={{ width: '1.125rem', height: '1.125rem' }} />
                          </button>
                          <button
                            onClick={() => handleDelete(contract.id)}
                            style={{
                              padding: '0.5rem',
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              color: '#ef4444',
                              transition: 'all 0.2s ease',
                              borderRadius: '0.25rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = '#dc2626';
                              e.target.style.backgroundColor = '#fee2e2';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = '#ef4444';
                              e.target.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Trash2 style={{ width: '1.125rem', height: '1.125rem' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{
          marginTop: '1rem',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#6b7280',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div>
            显示 {filteredContracts.length} 条，共 {contracts.length} 条
          </div>
        </div>
      </div>

      {/* 模态框保持不变 */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: '100%',
            maxWidth: '60rem',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                {editingContract ? '编辑合同' : '新增合同'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingContract(null);
                  setFormData({
                    businessNo: '',
                    salesman: '',
                    blNo: '',
                    invNo: '',
                    client: '',
                    quantity: '',
                    receiptDate: '',
                    sailDate: '',
                    currency: 'CNY',
                    status: '待确认',
                    receivableItems: [],
                    payableItems: []
                  });
                }}
                style={{
                  color: '#6b7280',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0
                }}
              >
                <X style={{ width: '1.5rem', height: '1.5rem' }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    业务编号 *
                  </label>
                  <input
                    type="text"
                    value={formData.businessNo}
                    onChange={(e) => setFormData({ ...formData, businessNo: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    业务员 *
                  </label>
                  <input
                    type="text"
                    value={formData.salesman}
                    onChange={(e) => setFormData({ ...formData, salesman: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    提单号
                  </label>
                  <input
                    type="text"
                    value={formData.blNo}
                    onChange={(e) => setFormData({ ...formData, blNo: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    发票号
                  </label>
                  <input
                    type="text"
                    value={formData.invNo}
                    onChange={(e) => setFormData({ ...formData, invNo: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    客户 *
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    数量
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    收货日期
                  </label>
                  <input
                    type="date"
                    value={formData.receiptDate}
                    onChange={(e) => setFormData({ ...formData, receiptDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    开航日期
                  </label>
                  <input
                    type="date"
                    value={formData.sailDate}
                    onChange={(e) => setFormData({ ...formData, sailDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    税号
                  </label>
                  <input
                    type="text"
                    value={formData.taxNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, taxNumber: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem'
                    }}
                    placeholder="请输入税号"
                  />
                  {formData.taxNumber && (
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      ⚠️ 已输入税号，明细项目将被锁定，无法修改状态或删除
                    </div>
                  )}
                </div>
              </div>

              {/* 应收应付明细 */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
                  应收应付明细
                </h4>
                
                {/* 横向输入区域 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
                  gap: '0.5rem',
                  alignItems: 'end',
                  marginBottom: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.375rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>
                      类型
                    </label>
                    <select
                      id="itemType"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="receivable">应收</option>
                      <option value="payable">应付</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>
                      项目名称
                    </label>
                    <input
                      id="itemName"
                      type="text"
                      placeholder="输入项目名称"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  

                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>
                      币种
                    </label>
                    <select
                      id="itemCurrency"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="CNY">CNY</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>
                      金额
                    </label>
                    <input
                      id="itemAmount"
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const type = document.getElementById('itemType').value;
                      const name = document.getElementById('itemName').value;
                      const currency = document.getElementById('itemCurrency').value;
                      const amount = parseFloat(document.getElementById('itemAmount').value) || 0;
                      
                      if (!name.trim()) {
                        alert('请输入项目名称');
                        return;
                      }
                      if (amount <= 0) {
                        alert('请输入有效金额');
                        return;
                      }
                      
                      const newItem = {
                        id: Date.now(),
                        name: name.trim(),
                        currency: currency,
                        amount: amount,
                        status: '待确认'
                      };
                      
                      if (type === 'receivable') {
                        setFormData(prev => ({
                          ...prev,
                          receivableItems: [...(prev.receivableItems || []), newItem]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          payableItems: [...(prev.payableItems || []), newItem]
                        }));
                      }
                      
                      // 清空输入框
                      document.getElementById('itemName').value = '';
                      document.getElementById('itemAmount').value = '';
                    }}
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      height: 'fit-content'
                    }}
                  >
                    添加
                  </button>
                </div>

                {/* 合并的应收应付明细表 */}
                {(formData.receivableItems?.length > 0 || formData.payableItems?.length > 0) && (
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      应收应付明细 ({(formData.receivableItems?.length || 0) + (formData.payableItems?.length || 0)}项)
                    </h5>
                    <div style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      overflow: 'hidden'
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '700', color: '#1e293b', borderRight: '1px solid #e2e8f0' }}>币种</th>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '700', color: '#16a34a', borderRight: '1px solid #e2e8f0' }}>应收合计</th>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '700', color: '#dc2626', borderRight: '1px solid #e2e8f0' }}>应付合计</th>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #e2e8f0' }}>类型</th>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #e2e8f0' }}>项目名称</th>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #e2e8f0' }}>金额</th>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #e2e8f0' }}>状态</th>
                            <th style={{ padding: '0.5rem 0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#374151', width: '50px' }}>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            // 合并所有项目并按币种分组
                            const allItems = [
                              ...(formData.receivableItems || []).map(item => ({ ...item, type: '应收', typeColor: '#16a34a' })),
                              ...(formData.payableItems || []).map(item => ({ ...item, type: '应付', typeColor: '#dc2626' }))
                            ];
                            
                            // 按币种分组并排序
                            const groupedByCurrency = allItems.reduce((acc, item) => {
                              if (!acc[item.currency]) acc[item.currency] = [];
                              acc[item.currency].push(item);
                              return acc;
                            }, {});
                            
                            // 按币种顺序显示
                            const currencyOrder = ['CNY', 'USD', 'EUR', 'GBP'];
                            let globalRowIndex = 0;
                            
                            return currencyOrder.flatMap(currency => {
                              const items = groupedByCurrency[currency] || [];
                              if (items.length === 0) return [];
                              
                              // 计算当前币种的应收和应付合计
                              const receivableTotal = items
                                .filter(item => item.type === '应收')
                                .reduce((sum, item) => sum + item.amount, 0);
                              const payableTotal = items
                                .filter(item => item.type === '应付')
                                .reduce((sum, item) => sum + item.amount, 0);
                              
                              return items.map((item, itemIndex) => (
                                <tr key={`${item.type}-${item.id}`} style={{
                                  borderBottom: '1px solid #f3f4f6',
                                  backgroundColor: globalRowIndex % 2 === 0 ? '#ffffff' : '#fafafa'
                                }}>
                                  {itemIndex === 0 && (
                                    <td style={{ 
                                      padding: '0.4rem 0.4rem', 
                                      fontSize: '0.8rem', 
                                      color: '#1e293b',
                                      backgroundColor: '#f8fafc',
                                      fontWeight: '700',
                                      verticalAlign: 'middle',
                                      borderRight: '1px solid #e2e8f0',
                                      borderBottom: '1px solid #e2e8f0'
                                    }} rowSpan={items.length}>
                                      <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontSize: '0.9rem'
                                      }}>
                                        {item.currency}
                                      </div>
                                    </td>
                                  )}
                                  {itemIndex === 0 && (
                                    <td style={{
                                      padding: '0.4rem 0.4rem',
                                      fontSize: '0.8rem',
                                      color: '#16a34a',
                                      backgroundColor: '#f0fdf4',
                                      fontWeight: '700',
                                      verticalAlign: 'middle',
                                      textAlign: 'right',
                                      borderRight: '1px solid #e2e8f0',
                                      borderBottom: '1px solid #e2e8f0'
                                    }} rowSpan={items.length}>
                                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                        {receivableTotal > 0 ? formatCurrency(receivableTotal, currency) : '-'}
                                      </div>
                                    </td>
                                  )}
                                  {itemIndex === 0 && (
                                    <td style={{
                                      padding: '0.4rem 0.4rem',
                                      fontSize: '0.8rem',
                                      color: '#dc2626',
                                      backgroundColor: '#fef2f2',
                                      fontWeight: '700',
                                      verticalAlign: 'middle',
                                      textAlign: 'right',
                                      borderRight: '1px solid #e2e8f0',
                                      borderBottom: '1px solid #e2e8f0'
                                    }} rowSpan={items.length}>
                                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                        {payableTotal > 0 ? formatCurrency(payableTotal, currency) : '-'}
                                      </div>
                                    </td>
                                  )}
                                  <td style={{ 
                                    padding: '0.3rem 0.4rem', 
                                    fontSize: '0.75rem',
                                    textAlign: 'center',
                                    borderRight: '1px solid #f1f5f9',
                                    borderBottom: '1px solid #f1f5f9'
                                  }}>
                                    <span style={{ 
                                      color: item.typeColor, 
                                      fontWeight: '600',
                                      fontSize: '0.7rem',
                                      padding: '0.15rem 0.4rem',
                                      borderRadius: '0.2rem',
                                      backgroundColor: item.type === '应收' ? '#dcfce7' : '#fee2e2'
                                    }}>{item.type}</span>
                                  </td>
                                  <td style={{ 
                                    padding: '0.3rem 0.4rem', 
                                    fontSize: '0.75rem', 
                                    color: '#374151',
                                    borderRight: '1px solid #f1f5f9',
                                    borderBottom: '1px solid #f1f5f9'
                                  }}>
                                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                                  </td>
                                  <td style={{ 
                                    padding: '0.3rem 0.4rem', 
                                    fontSize: '0.75rem', 
                                    textAlign: 'right', 
                                    fontWeight: '600', 
                                    color: item.typeColor,
                                    fontFamily: 'monospace',
                                    borderRight: '1px solid #f1f5f9',
                                    borderBottom: '1px solid #f1f5f9'
                                  }}>
                                    {formatCurrency(item.amount, item.currency)}
                                  </td>
                                  <td style={{ 
                                    padding: '0.3rem 0.4rem', 
                                    textAlign: 'center',
                                    borderRight: '1px solid #f1f5f9',
                                    borderBottom: '1px solid #f1f5f9'
                                  }}>
                                    <span style={{ 
                                       fontSize: '0.7rem',
                                       fontWeight: '600',
                                       padding: '0.15rem 0.4rem',
                                       borderRadius: '0.2rem',
                                       backgroundColor: item.status === '已收' ? '#dcfce7' : 
                                                        item.status === '已付' ? '#fef2f2' : '#fef3c7',
                                       color: item.status === '已收' ? '#16a34a' : 
                                              item.status === '已付' ? '#dc2626' : '#d97706'
                                     }}>
                                       {item.status}
                                     </span>
                                  </td>
                                  <td style={{ 
                                    padding: '0.3rem 0.4rem', 
                                    textAlign: 'center',
                                    borderBottom: '1px solid #f1f5f9'
                                  }}>
                                    {!formData.taxNumber && (
                                      <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center' }}>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (item.type === '应收') {
                                              setFormData(prev => ({
                                                ...prev,
                                                receivableItems: prev.receivableItems.map(i => 
                                                  i.id === item.id ? { ...i, status: '已收' } : i
                                                )
                                              }));
                                            } else {
                                              setFormData(prev => ({
                                                ...prev,
                                                payableItems: prev.payableItems.map(i => 
                                                  i.id === item.id ? { ...i, status: '已付' } : i
                                                )
                                              }));
                                            }
                                          }}
                                          style={{
                                            backgroundColor: (item.status === '应收' || item.status === '应付') ? '#f3f4f6' : '#e5e7eb',
                                            color: (item.status === '应收' || item.status === '应付') ? '#374151' : '#6b7280',
                                            border: 'none',
                                            cursor: (item.status === '应收' || item.status === '应付') ? 'pointer' : 'not-allowed',
                                            fontSize: '0.65rem',
                                            padding: '0.1rem 0.2rem',
                                            borderRadius: '0.15rem',
                                            fontWeight: '500'
                                          }}
                                          disabled={item.status === '已收' || item.status === '已付'}
                                        >
                                          {item.status === '应收' ? '标记已收' : item.status === '应付' ? '标记已付' : '✓'}
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (item.type === '应收') {
                                              setFormData(prev => ({
                                                ...prev,
                                                receivableItems: prev.receivableItems.filter(i => i.id !== item.id)
                                              }));
                                            } else {
                                              setFormData(prev => ({
                                                ...prev,
                                                payableItems: prev.payableItems.filter(i => i.id !== item.id)
                                              }));
                                            }
                                          }}
                                          style={{
                                            backgroundColor: 'transparent',
                                            color: '#dc2626',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '0.7rem',
                                            padding: '0.1rem',
                                            fontWeight: '500'
                                          }}
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ));
                              globalRowIndex += items.length;
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '1.5rem'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingContract(null);
                    setFormData({
                businessNo: '',
                salesman: '',
                blNo: '',
                invNo: '',
                client: '',
                quantity: '',
                receiptDate: '',
                sailDate: '',
                currency: 'CNY',
                status: '待确认',
                receivableItems: [],
                payableItems: []
              });
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  {editingContract ? '更新' : '创建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsPage;