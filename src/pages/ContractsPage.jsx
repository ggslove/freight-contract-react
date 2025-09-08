import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import contractService from '../services/contractService';
import StatsCard from '../components/Common/StatsCard';
import ContractTable from '../components/Contracts/ContractTable';
import ContractForm from '../components/Contracts/ContractForm';
import { filterContracts, getInitialFormData, createFormDataFromContract } from '../components/Contracts/contractUtils';

// 映射后端数据到前端格式
const mapBackendContractToFrontend = (contract) => ({
  id: contract.id,
  businessNo: contract.businessNo,
  salesman: contract.salesman || '',
  blNo: contract.billNo || '',
  invNo: '', // 后端没有发票号字段
  client: contract.customerName,
  quantity: contract.description || '',
  receiptDate: contract.contractDate ? new Date(contract.contractDate).toISOString().split('T')[0] : '',
  sailDate: contract.deliveryDate ? new Date(contract.deliveryDate).toISOString().split('T')[0] : '',
  currency: contract.currency,
  status: contract.status,
  // 保持原始数据结构用于编辑
  receivables: contract.receivables || [],
  payables: contract.payables || [],
  // 同时提供前端格式
  receivableItems: contract.receivables?.map(r => ({
    id: r.id,
    name: r.customerName,
    currency: r.currency,
    amount: r.amount,
    status: r.status
  })) || [],
  payableItems: contract.payables?.map(p => ({
    id: p.id,
    name: p.supplierName,
    currency: p.currency,
    amount: p.amount,
    status: p.status
  })) || []
});

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
      const mappedContracts = contracts.map(mapBackendContractToFrontend);
      setContracts(mappedContracts);
    } catch (err) {
      console.error('获取合同列表失败:', err);
      setError(err.message);
      // 如果后端连接失败，使用模拟数据
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
          status: 'PROCESSING',
          receivableItems: [
            { id: 1, name: '海运费', currency: 'CNY', amount: 5000 },
            { id: 2, name: '港口费', currency: 'CNY', amount: 1500 }
          ],
          payableItems: [
            { id: 1, name: '代理费', currency: 'CNY', amount: 2000 },
            { id: 2, name: '文件费', currency: 'CNY', amount: 300 }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 修复日期格式：处理type="date"输入的YYYY-MM-DD格式
      const formatDateForBackend = (dateString) => {
        if (!dateString) return null;
        
        // 如果已经是YYYY-MM-DD格式，添加时间部分
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
          return `${dateString}T00:00:00`;
        }
        
        // 如果是其他格式，尝试解析并格式化
        try {
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return null;
          
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          
          return `${year}-${month}-${day}T00:00:00`;
        } catch (error) {
          console.error('日期格式转换失败:', error);
          return null;
        }
      };

      const contractData = {
        businessNo: formData.businessNo,
        customerName: formData.client,
        billNo: formData.blNo,
        salesman: formData.salesman,
        amount: parseFloat(formData.receivableItems?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0),
        currency: formData.currency,
        status: 'PENDING',
        description: formData.quantity,
        contractDate: formatDateForBackend(formData.receiptDate),
        deliveryDate: formatDateForBackend(formData.sailDate)
      };

      if (editingContract) {
        await contractService.updateContract(editingContract.id, {
          ...contractData,
          status: editingContract.status || 'PENDING'
        });
      } else {
        // 使用后端级联保存功能，一次性创建合同及其关联的应收应付记录
        const receivableInputs = formData.receivableItems?.map(item => ({
          customerName: item.name || '未知客户',
          amount: item.amount || 0,
          currencyCode: item.currency || 'CNY',
          status: 'PENDING',
        })) || [];

        const payableInputs = formData.payableItems?.map(item => ({
          supplierName: item.name || '未知供应商',
          amount: item.amount || 0,
          currencyCode: item.currency || 'CNY',
          status: 'PENDING',
        })) || [];

        // 使用后端级联保存功能
        await contractService.createContract({
          ...contractData,
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
      // 直接使用已加载的应收应付数据
      const contractWithDetails = {
        ...contract,
        receivableItems: contract.receivables?.map(r => ({
          id: r.id,
          name: r.customerName,
          currency: r.currency,
          amount: r.amount,
          status: r.status
        })) || [],
        payableItems: contract.payables?.map(p => ({
          id: p.id,
          name: p.supplierName,
          currency: p.currency,
          amount: p.amount,
          status: p.status
        })) || []
      };

      setEditingContract(contractWithDetails);
      setFormData(createFormDataFromContract(contractWithDetails));
      setShowModal(true);
    } catch (error) {
      console.error('获取合同详情失败:', error);
      // 如果获取详情失败，仍然打开编辑窗口，但使用基础数据
      setEditingContract(contract);
      setFormData(createFormDataFromContract(contract));
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
            连接后端失败: {error}
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
  const processingContracts = contracts.filter(c => c.status === 'PROCESSING').length;
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
          onClick={handleAddNew}
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
          title={t('contracts.processingContracts')}
          value={processingContracts}
          icon="🔄"
          change={`${processingContracts}`}
          trend="up"
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
      <ContractForm
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
        isEditing={!!editingContract}
        showModal={showModal}
      />
    </div>
  );
};

export default ContractsPage;