// 计算工具

// 计算总金额
export const calculateTotal = (amounts) => {
  if (!amounts || !Array.isArray(amounts)) return 0;
  return amounts.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
};

// 按币种分组
export const groupByCurrency = (amounts) => {
  if (!amounts || !Array.isArray(amounts)) return {};
  
  return amounts.reduce((groups, item) => {
    const currency = item.currency || 'CNY';
    if (!groups[currency]) {
      groups[currency] = 0;
    }
    groups[currency] += parseFloat(item.amount) || 0;
    return groups;
  }, {});
};

// 计算统计数据
export const calculateStats = (contracts) => {
  if (!contracts || !Array.isArray(contracts)) {
    return {
      totalContracts: 0,
      totalReceivable: 0,
      totalPayable: 0,
      netCashFlow: 0,
      currencyBreakdown: {},
      recentContracts: []
    };
  }

  const totalContracts = contracts.length;
  
  // 计算应收和应付
  let totalReceivable = 0;
  let totalPayable = 0;
  
  contracts.forEach(contract => {
    const receivable = calculateTotal(contract.receivableAmounts || []);
    const payable = calculateTotal(contract.payableAmounts || []);
    
    totalReceivable += receivable;
    totalPayable += payable;
  });

  // 币种分布
  const allReceivable = contracts.flatMap(c => c.receivableAmounts || []);
  const currencyBreakdown = groupByCurrency(allReceivable);

  // 最近合同（按更新时间排序，取前5个）
  const recentContracts = [...contracts]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);

  return {
    totalContracts,
    totalReceivable,
    totalPayable,
    netCashFlow: totalReceivable - totalPayable,
    currencyBreakdown,
    recentContracts
  };
};

// 格式化金额
export const formatCurrency = (amount, currency = 'CNY') => {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  try {
    return formatter.format(amount);
  } catch (error) {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

// 格式化日期
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

// 获取状态颜色
export const getStatusColor = (status) => {
  const colors = {
    'pending': 'yellow',
    'partial': 'blue',
    'completed': 'green',
    'overdue': 'red',
    'draft': 'gray'
  };
  
  return colors[status?.toLowerCase()] || 'gray';
};

// 获取状态中文名称
export const getStatusName = (status) => {
  const names = {
    'pending': '待处理',
    'partial': '部分完成',
    'completed': '已完成',
    'overdue': '已过期',
    'draft': '草稿'
  };
  
  return names[status?.toLowerCase()] || status || '未知';
};