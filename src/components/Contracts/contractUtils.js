export const formatCurrency = (amount, currency = 'CNY') => {
  if (isNaN(amount)) return '¥0.00';
  
  const symbol = currency === 'USD' ? '$' : 
                 currency === 'EUR' ? '€' : 
                 currency === 'GBP' ? '£' : '¥';
  
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN');
};

export const filterContracts = (contracts, searchTerm) => {
  if (!searchTerm) return contracts;
  
  return contracts.filter(contract =>
    contract.businessNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.blNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.salesman?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const calculateTotalAmount = (items = []) => {
  return items.reduce((sum, item) => sum + (item.amount || 0), 0);
};

export const getInitialFormData = () => ({
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

export const createFormDataFromContract = (contract) => ({
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