// 本地存储工具
const STORAGE_KEY = 'freightContracts';

// 获取所有合同
export const getContracts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading contracts from localStorage:', error);
    return [];
  }
};

// 保存所有合同
export const saveContracts = (contracts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
    return true;
  } catch (error) {
    console.error('Error saving contracts to localStorage:', error);
    return false;
  }
};

// 添加新合同
export const addContract = (contract) => {
  const contracts = getContracts();
  const newContract = {
    id: Date.now().toString(),
    ...contract,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  contracts.push(newContract);
  saveContracts(contracts);
  return newContract;
};

// 更新合同
export const updateContract = (id, updates) => {
  const contracts = getContracts();
  const index = contracts.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  contracts[index] = {
    ...contracts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveContracts(contracts);
  return contracts[index];
};

// 删除合同
export const deleteContract = (id) => {
  const contracts = getContracts();
  const filteredContracts = contracts.filter(c => c.id !== id);
  saveContracts(filteredContracts);
  return true;
};

// 获取单个合同
export const getContract = (id) => {
  const contracts = getContracts();
  return contracts.find(c => c.id === id) || null;
};

// 搜索合同
export const searchContracts = (query) => {
  const contracts = getContracts();
  if (!query) return contracts;
  
  const searchTerm = query.toLowerCase();
  return contracts.filter(contract => 
    contract.businessNumber?.toLowerCase().includes(searchTerm) ||
    contract.theClient?.toLowerCase().includes(searchTerm) ||
    contract.blNumber?.toLowerCase().includes(searchTerm) ||
    contract.vessel?.toLowerCase().includes(searchTerm) ||
    contract.pol?.toLowerCase().includes(searchTerm) ||
    contract.pod?.toLowerCase().includes(searchTerm)
  );
};