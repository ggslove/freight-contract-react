import React, { useState, useEffect } from 'react';
import { t } from '../utils/i18n';
import ContractForm from '../components/Contracts/ContractForm';
import ContractStats from '../components/Contracts/ContractStats';
import contractService from '../services/contractService';
import { safeAsync } from '../utils/globalErrorHandler';
import { CONTRACT_STATUSES } from '../constants/contract';

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [editingContract, setEditingContract] = useState(null);
  // 所有合同统计数据状态
  const [allContractsStats, setAllContractsStats] = useState([]);
  
  // 分页相关状态
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null
  });
  const [totalCount, setTotalCount] = useState(0);
  const contractsPerPage = 10;

  useEffect(() => {
    fetchContracts();
    fetchAllContractsStats();

    // Listen for language changes
    const handleLanguageChange = () => {
      // Language change event handler
      fetchContracts();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [currentPage, searchTerm, statusFilter, dateRange]);

  const fetchAllContractsStats = async () => {
    await safeAsync(async () => {
      // 构建筛选条件对象，与fetchContracts保持一致
      const filter = {
        searchTerm: searchTerm || undefined,
        status: statusFilter || undefined,
        // 只在有日期值时才传递，避免不必要的参数
        startDate: dateRange.startDate ? new Date(dateRange.startDate).toISOString() : undefined,
        endDate: dateRange.endDate ? new Date(dateRange.endDate).toISOString() : undefined
      };
      
      const stats = await contractService.getContractStats(filter);
      setAllContractsStats(stats);
    }, t('contracts.fetchError'));
  };

  const fetchContracts = async () => {
    await safeAsync(async () => {
      setLoading(true);
      const first = contractsPerPage;
      // 计算游标
      const after = currentPage > 1 ? btoa(`arrayconnection:${(currentPage - 1) * contractsPerPage - 1}`) : null;

      // 构建筛选条件对象
      const filter = {
        searchTerm: searchTerm || undefined,
        status: statusFilter || undefined,
        // 只在有日期值时才传递，避免不必要的参数
        startDate: dateRange.startDate ? new Date(dateRange.startDate).toISOString() : undefined,
        endDate: dateRange.endDate ? new Date(dateRange.endDate).toISOString() : undefined
      };

      // 使用统一的方法获取合同列表，并传递筛选条件
      const result = await contractService.getContractsPaginated(first, after, filter);
      
      setContracts(result.contracts);
      setPageInfo(result.pageInfo);
      setTotalCount(result.totalCount);
    } ,t('contracts.fetchError'),()=>{setLoading(false)});
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateRange({ startDate: '', endDate: '' });
    setStatusFilter('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNewModal = () => {
    setEditingContract(null);
    setFormData(
      {
      businessNo:'',
      billNo: '',
      salesman:'',
      theClient: '',
      invoiceNo:'',
      quantity: '',
      status: CONTRACT_STATUSES[0]
    }
    );
    setShowModal(true);
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setFormData({
      businessNo: contract.businessNo,
      billNo: contract.billNo,
      salesman: contract.salesman,
      theClient: contract.theClient,
      invoiceNo: contract.invoiceNo,
      quantity: contract.quantity,
      dateOfReceipt: contract.dateOfReceipt,
      dateOfSailing: contract.dateOfSailing || '',
      status: contract.status
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContract(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contractData = formData
    if (editingContract) {
      await contractService.updateContract(editingContract.id, contractData);
    } else {
      await contractService.createContract(contractData);
    }
      // 重新获取当前页数据
    await fetchContracts();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('contracts.confirmDelete'))) {
     await safeAsync(async ()=>{
        await contractService.deleteContract(id);
        await fetchContracts(); 
     },t('contracts.deleteError'))   
    }
  };

  const handleFormChange = (formData) => {
    setFormData(prev => formData);
  };

  const getStatusColor = (status) => {
    //  ACTIVE: '已生效（执行中）',
    //  PENDING: '待结算',
    //  SETTLED: '已结算（闭环）',
    const colors = {
      ACTIVE: 'bg-blue-100 text-blue-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      SETTLED: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // 计算分页信息
  const totalPages = Math.ceil(totalCount / contractsPerPage);
  const indexOfFirstContract = (currentPage - 1) * contractsPerPage + 1;
  const indexOfLastContract = Math.min(currentPage * contractsPerPage, totalCount);

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
          onClick={handleNewModal}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('contracts.addContract')}
        </button>
      </div>

      {/* Contract Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('contracts.stats')}
          </h3>
          <ContractStats allContractsStats={allContractsStats} />
        </div>

      {/* Compact Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('contracts.search')}
            </label>
            <input
              type="text"
              placeholder={t('contracts.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('contracts.startDate')}
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('contracts.endDate')}
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('contracts.status')}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('contracts.allStatus')}</option>
                {CONTRACT_STATUSES.map(status => (
                  <option key={status} value={status}>{t(`contractStatus.${status}`)}</option>
                ))}
              </select>
            </div>
            <button
              onClick={resetFilters}
              className="self-end px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 h-8"
              title={t('contracts.resetFilters')}
            >
              {t('common.reset')}
            </button>
          </div>
        </div>
      </div>

      {/* Contract List with Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('contracts.contractList')}
          </h3>
        </div>
        
        {/* Fixed column table container - Ensure middle columns are scrollable */}
        <div className="overflow-x-auto" style={{maxWidth: '100%', position: 'relative'}}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {/* First column fixed - Using sticky positioning */}
                <th scope="col" className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky left-0 z-20 bg-gray-50 dark:bg-gray-700">
                  {t('contracts.businessNo')}
                </th>
                {/* 中间列设置明确宽度 */}
                <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('contracts.billNo')}
                </th>
                <th scope="col" className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('contracts.salesman')}
                </th>
                <th scope="col" className="w-64 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('contracts.theClient')}
                </th>
                <th scope="col" className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('contracts.invoiceNo')}
                </th>
                <th scope="col" className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('contracts.quantity')}
                </th>
                <th scope="col" className="w-36 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('contracts.dateOfReceipt')}
                </th>
                <th scope="col" className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('contracts.status')}
                </th>
                {/* Last column fixed - Using sticky positioning */}
                <th scope="col" className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky right-0 z-20 bg-gray-50 dark:bg-gray-700">
                  {t('common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">{t('common.loading')}</p>
                  </td>
                </tr>
              ) : (
                contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    {/* First column data fixed - Ensure background color covers scrolling content */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white sticky left-0 z-10 bg-white dark:bg-gray-800">
                      {contract.businessNo}
                    </td>
                    {/* 中间列数据单元格保持正常滚动 */}
                    <td className="w-48 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {contract.billNo}
                    </td>
                    <td className="w-36 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {contract.salesman}
                    </td>
                    <td className="w-64 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {contract.theClient}
                    </td>
                    <td className="w-48 px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {contract.invoiceNo}
                    </td>
                    <td className="w-32 px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${contract.quantity?.toLocaleString()}
                    </td>
                    <td className="w-36 px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(contract.dateOfReceipt).toLocaleDateString()}
                    </td>
                    <td className="w-32 px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                        {t(`contracts.${contract.status}`)}
                      </span>
                    </td>
                    {/* Last column data fixed - Ensure background color covers scrolling content */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3 sticky right-0 z-10 bg-white dark:bg-gray-800">
                      <button
                        onClick={() => handleEdit(contract)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {t('common.edit')}
                      </button>
                      <button
                        onClick={() => handleDelete(contract.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        {t('common.delete')}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {!loading && contracts.length === 0 && (
            <div className="px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{t('contracts.noContracts')}</h3>
              <p className="mt-1 text-sm text-gray-500">{t('contracts.noContractsDescription')}</p>
            </div>
          )}
        </div>
        
        {/* Pagination - Always Visible */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {t('common.showing')} {indexOfFirstContract} {t('common.to')} {Math.min(indexOfLastContract, totalCount)} {t('common.of')} {totalCount} {t('common.results')}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.previous')}
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                return startPage + i;
              }).filter(page => page > 0 && page <= totalPages).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.next')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal dialog */}
      <ContractForm
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
        showModal={showModal}
        isEditMode={!!editingContract}
        editingContract={editingContract}
      />
    </div>
  );
};

export default ContractsPage;