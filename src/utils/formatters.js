// 工具函数：格式化日期
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// 工具函数：格式化货币
export const formatCurrency = (amount, currency = 'CNY') => {
  if (isNaN(amount)) return '¥0.00';
  
  const symbol = currency === 'USD' ? '$' : 
                 currency === 'EUR' ? '€' : 
                 currency === 'GBP' ? '£' : '¥';
  
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
};

// 工具函数：映射状态显示
export const formatStatus = (status) => {
  const statusMap = {
    'PENDING': '待处理',
    'PARTIAL': '部分完成',
    'COMPLETED': '已完成',
    'OVERDUE': '已过期'
  };
  return statusMap[status] || status;
};

// 工具函数：计算应收/应付总额
export const calculateTotal = (items) => {
  if (!items || !Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
};

// 工具函数：按状态分组
export const groupByStatus = (items) => {
  if (!items || !Array.isArray(items)) return {};
  
  return items.reduce((groups, item) => {
    const status = item.status || 'UNKNOWN';
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(item);
    return groups;
  }, {});
};
