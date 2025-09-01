import React, { useState, useEffect } from 'react';
import ContractHeader from '../components/Contracts/ContractHeader';
import SearchBar from '../components/Contracts/SearchBar';
import ContractTable from '../components/Contracts/ContractTable';
import ContractForm from '../components/Contracts/ContractForm';
import { filterContracts, getInitialFormData, createFormDataFromContract } from '../components/Contracts/contractUtils';
import { t } from '../utils/i18n';
import contractService from '../services/contractService';

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
        // 创建合同
        const result = await contractService.createContract(contractData);
        const newContractId = result.id;
        
        // 创建应收记录
        if (formData.receivableItems && formData.receivableItems.length > 0) {
          for (const receivable of formData.receivableItems) {
            if (!receivable.currency) {
              receivable.currency = 'CNY'; // 确保货币有默认值
            }
            await contractService.createReceivable({
              contractId: newContractId,
              customerName: receivable.name || '未知客户',
              amount: receivable.amount || 0,
              currency: receivable.currency,
              status: 'PENDING',
              dueDate: formatDateForBackend(formData.sailDate) // 使用开航日期作为默认到期日
            });
          }
        }
        
        // 创建应付记录
        if (formData.payableItems && formData.payableItems.length > 0) {
          for (const payable of formData.payableItems) {
            if (!payable.currency) {
              payable.currency = 'CNY'; // 确保货币有默认值
            }
            await contractService.createPayable({
              contractId: newContractId,
              supplierName: payable.name || '未知供应商',
              amount: payable.amount || 0,
              currency: payable.currency,
              status: 'PENDING',
              dueDate: formatDateForBackend(formData.sailDate) // 使用开航日期作为默认到期日
            });
          }
        }
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
        <ContractHeader onAddClick={handleAddNew} />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <div style={{ padding: '0' }}>
          <ContractTable 
            contracts={filteredContracts} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
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

      {showModal && (
        <ContractForm
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          isEditing={!!editingContract}
        />
      )}
    </div>
  );
};

export default ContractsPage;