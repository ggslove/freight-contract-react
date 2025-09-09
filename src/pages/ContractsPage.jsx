import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import contractService from '../services/contractService';
import StatsCard from '../components/Common/StatsCard';
import ContractTable from '../components/Contracts/ContractTable';
import ContractForm from '../components/Contracts/ContractForm';
import { filterContracts, getInitialFormData } from '../components/Contracts/contractUtils';
import ErrorBoundary from '../components/ErrorBoundary';



const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [language, setLanguageState] = useState('zh');
  const [formData, setFormData] = useState(getInitialFormData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取合同列表
  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      const contracts = await contractService.getAllContracts();
      // 直接使用后端的合同数据，无需映射转换
      setContracts(contracts);
    } catch (err) {
      console.error('获取合同列表失败:', err);
      setError(err.message);
      // 如果后端连接失败，使用模拟数据
      setContracts([
        {
          id: 1,
          businessNo: 'HT2024001',
          salesman: '张三',
          billNo: 'BL123456789',
          theClient: 'ABC国际贸易公司',
          quantity: '6500.00',
          status: 'PENDING',
          dateOfReceipt: '2024-01-10',
          dateOfSailing: '2024-01-15',
          invoiceNo: 'INV2024001',
          remarks: '首次合作合同',
          receivables: [
            { id: 1, financeItem: '海运费', currencyCode: 'CNY', amount: 5000, status: 'PENDING' },
            { id: 2, financeItem: '港口费', currencyCode: 'CNY', amount: 1500, status: 'PENDING' }
          ],
          payables: [
            { id: 1, financeItem: '代理费', currencyCode: 'CNY', amount: 2000, status: 'PENDING' },
            { id: 2, financeItem: '文件费', currencyCode: 'CNY', amount: 300, status: 'PENDING' }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 合并初始加载和语言变化监听
  useEffect(() => {
    fetchContracts();

    let languageChangeTimeout;
    const handleLanguageChange = (event) => {
      setLanguageState(event.detail);
      // 防抖处理，避免重复调用
      clearTimeout(languageChangeTimeout);
      languageChangeTimeout = setTimeout(() => {
        console.log('🌐 Language change triggered fetchContracts');
        fetchContracts();
      }, 100);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      clearTimeout(languageChangeTimeout);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 使用解构赋值移除receivableItems和payableItems
      const { receivables, payables,...contractInput } = formData;
      
      // 构建应收应付数据
      const receivableInputs = receivables?.map(item => ({
        financeItem: item.financeItem || item.name || '未知客户',
        amount: item.amount || 0,
        currencyCode: item.currencyCode || item.currency || 'CNY',
        status: item.status || 'PENDING',
      })) || [];

      const payableInputs = payables?.map(item => ({
        financeItem: item.financeItem || item.name || '未知供应商',
        amount: item.amount || 0,
        currencyCode: item.currencyCode || item.currency || 'CNY',
        status: item.status || 'PENDING',
      })) || [];

      if (editingContract) {
        // 更新合同
        await contractService.updateContract(editingContract.id, {
          ...contractInput,
          status: formData.status || editingContract.status || 'PENDING'
        });
      } else {
        // 创建新合同
        await contractService.createContract({
          contractInput,
          receivableInputs,
          payableInputs
        });
      }
      
      await fetchContracts();
      handleCloseModal();
    } catch (err) {
      console.error('保存合同失败:', err);
      alert(`保存失败: ${err.message}`);
    }
  };

  const handleEdit = async (contract) => {
    try {
      // 获取完整的合同详情
      const contractDetails = await contractService.getContractById(contract.id);
      const contract = contractDetails.data;
      
      setEditingContract(contract);
      setFormData({
        ...contract,
        receivables: contract.receivables || [],
        payables: contract.payables || []
      });
      setShowModal(true);
    } catch (error) {
      console.error('获取合同详情失败:', error);
      // 如果获取详情失败，仍然打开编辑窗口，但使用基础数据
      setEditingContract(contract);
      setFormData({
        ...contract,
        receivables: [],
        payables: []
      });
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('contracts.confirmDelete'))) {
      try {
        await contractService.deleteContract(id);
        await fetchContracts();
      } catch (err) {
        console.error('删除合同失败:', err);
        alert(`删除失败: ${err.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContract(null);
    setFormData(getInitialFormData());
  };

  const handleAddNew = () => {
    setEditingContract(null);
    setFormData(getInitialFormData());
    setShowModal(true);
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const filteredContracts = filterContracts(contracts, searchTerm);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '1.125rem', color: '#6b7280' }}>
          加载中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ color: '#ef4444', marginBottom: '1rem' }}>
            连接后端失败: {typeof error === 'object' ? error.message || error.toString() : error}
          </div>
          <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            正在使用模拟数据...
          </div>
        </div>
      </div>
    );
  }

  // 计算统计数据
  const totalContracts = contracts.length;
  const partialContracts = contracts.filter(c => c.status === 'PARTIAL').length;
  const completedContracts = contracts.filter(c => c.status === 'COMPLETED').length;
  const pendingContracts = contracts.filter(c => c.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('contracts.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('contracts.subtitle')}
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => {
            setEditingContract(null);
            setFormData(getInitialFormData());
            setShowModal(true);
          }}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('contracts.addContract')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title={t('contracts.totalContracts')}
          value={totalContracts}
          icon="📋"
          change={`${totalContracts}`}
          trend="neutral"
        />
        <StatsCard
          title={t('contracts.partialContracts')}
          value={partialContracts}
          icon="🔄"
          change={`${partialContracts}`}
          trend="neutral"
        />
        <StatsCard
          title={t('contracts.completedContracts')}
          value={completedContracts}
          icon="✅"
          change={`${completedContracts}`}
          trend="up"
        />
        <StatsCard
          title={t('contracts.pendingContracts')}
          value={pendingContracts}
          icon="⏳"
          change={`${pendingContracts}`}
          trend="neutral"
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('contracts.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Contract Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('contracts.contractList')}
          </h3>
        </div>
        <ContractTable 
          contracts={filteredContracts} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>

      {/* Contract Form Modal */}
      <ErrorBoundary>
        <ContractForm
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          isEditing={!!editingContract}
          showModal={showModal}
        />
      </ErrorBoundary>
    </div>
  );
};

export default ContractsPage;