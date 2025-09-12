// 表格样式配置 - 简化命名版本

// 表格容器
export const tableContainer = {
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'hidden'
};

// 表格基础样式
export const tableBase = {
  width: '100%',
  borderCollapse: 'collapse'
};

// 表格行样式
export const trHeader = {
  backgroundColor: '#fafafa',
  borderBottom: '1px solid #f0f0f0'
};

export const trStriped = (index) => ({
  borderBottom: '1px solid #f0f0f0',
  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa'
});

// 表头单元格样式
export const thBase = {
  padding: '1rem',
  textAlign: 'left',
  fontWeight: '500'
};

// 数据单元格样式
export const tdBase = {
  padding: '1rem',
  textAlign: 'left'
};

// 表格按钮样式
export const btnBase = {
  padding: '0.375rem 0.75rem',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const btnPrimary = {
  backgroundColor: '#1890ff',
  color: 'white',
  '&:hover': { backgroundColor: '#096dd9' }
};

export const btnDanger = {
  backgroundColor: '#ff4d4f',
  color: 'white',
  '&:hover': { backgroundColor: '#ff7875' }
};

export const btnDisabled = {
  backgroundColor: '#d9d9d9',
  color: 'white',
  cursor: 'not-allowed'
};

// 状态标签样式
export const statusTag = (type) => {
  const styles = {
    success: {
      padding: '0.25rem 0.5rem',
      backgroundColor: '#f6ffed',
      color: '#52c41a',
      borderRadius: '0.25rem',
      fontSize: '0.875rem'
    },
    warning: {
      padding: '0.25rem 0.5rem',
      backgroundColor: '#fff7e6',
      color: '#faad14',
      borderRadius: '0.25rem',
      fontSize: '0.875rem'
    },
    error: {
      padding: '0.25rem 0.5rem',
      backgroundColor: '#fff2f0',
      color: '#ff4d4f',
      borderRadius: '0.25rem',
      fontSize: '0.875rem'
    },
    active: {
      padding: '0.25rem 0.5rem',
      backgroundColor: '#e6f7ff',
      color: '#1890ff',
      borderRadius: '0.25rem',
      fontSize: '0.875rem'
    }
  };
  return styles[type] || styles.active;
};

// 斑马纹样式工具函数
export const getZebraStyle = (index) => ({
  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa'
});

// 向后兼容（保留旧命名，标记为已废弃）
export const TABLE_CONTAINER = tableContainer;
export const TABLE_BASE = tableBase;
export const TR_STYLES = {
  header: trHeader,
  striped: trStriped
};
export const TH_STYLES = { base: thBase };
export const TD_STYLES = { base: tdBase };
export const TABLE_BUTTONS = {
  base: btnBase,
  primary: btnPrimary,
  danger: btnDanger,
  disabled: btnDisabled
};
export const getStatusStyle = statusTag;