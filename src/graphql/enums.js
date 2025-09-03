// GraphQL枚举定义 - 与后端schema完全匹配

// 合同状态枚举
export const ContractStatus = {
  PENDING: 'PENDING',     // 待处理
  PROCESSING: 'PROCESSING', // 处理中
  COMPLETED: 'COMPLETED',   // 已完成
  CANCELLED: 'CANCELLED'   // 已取消
};

// 应收款状态枚举
export const ReceivableStatus = {
  PENDING: 'PENDING',     // 待处理
  PARTIAL: 'PARTIAL',     // 部分完成
  COMPLETED: 'COMPLETED', // 已完成
  OVERDUE: 'OVERDUE'      // 已逾期
};

// 应付款状态枚举
export const PayableStatus = {
  PENDING: 'PENDING',     // 待处理
  PARTIAL: 'PARTIAL',     // 部分完成
  COMPLETED: 'COMPLETED', // 已完成
  OVERDUE: 'OVERDUE'      // 已逾期
};

// 用户角色枚举
export const Role = {
  ADMIN: 'ADMIN',     // 管理员
  MANAGER: 'MANAGER', // 业务经理
  FINANCE: 'FINANCE', // 财务人员
  USER: 'USER'        // 普通用户
};

// 用户状态枚举
export const UserStatus = {
  ENABLED: 'ENABLED',   // 启用
  DISABLED: 'DISABLED'  // 禁用
};

// 货币枚举（常用货币）
export const Currency = {
  CNY: 'CNY', // 人民币
  USD: 'USD', // 美元
  EUR: 'EUR', // 欧元
  GBP: 'GBP', // 英镑
  JPY: 'JPY'  // 日元
};