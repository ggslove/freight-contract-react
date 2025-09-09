// 统一的表单样式配置

// 模态框样式
export const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

export const modalContainer = {
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  maxWidth: '42rem',
  maxHeight: '90vh',
  overflow: 'hidden',
  width: '100%',
  margin: '1rem'
};

export const modalHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.5rem',
  borderBottom: '1px solid #e5e7eb'
};

export const modalFooter = {
  marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end'
};

export const modalCloseButton = {
  padding: '0.25rem',
  color: '#6b7280',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '0.25rem',
  transition: 'color 0.2s',
  ':hover': {
    color: '#374151'
  }
};

export const formContainer = {
  padding: '1.5rem',
  overflowY: 'auto',
  maxHeight: 'calc(90vh - 120px)'
};

export const formGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1rem',
  marginBottom: '1rem'
};

// 表单元素样式
export const inputLabel = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '500',
  marginBottom: '0.5rem',
  color: '#374151'
};

export const inputField = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s',
  ':focus': {
    outline: 'none',
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  }
};

export const textareaField = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  minHeight: '80px',
  resize: 'vertical',
  transition: 'border-color 0.2s',
  ':focus': {
    outline: 'none',
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  }
};

export const selectField = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  backgroundColor: 'white',
  transition: 'border-color 0.2s',
  ':focus': {
    outline: 'none',
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  }
};

// 明细样式
export const sectionTitle = {
  fontSize: '1.125rem',
  fontWeight: '600',
  marginBottom: '1rem',
  color: '#1f2937'
};

export const itemGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '1rem'
};

export const itemListHeader = {
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
  gap: '1rem',
  padding: '0.75rem 1rem',
  backgroundColor: '#f8fafc',
  fontSize: '0.75rem',
  fontWeight: '600',
  color: '#374151'
};

export const itemRow = {
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
  gap: '1rem',
  padding: '0.75rem 1rem',
  borderTop: '1px solid #e5e7eb',
  alignItems: 'center',
  fontSize: '0.875rem'
};

export const deleteButton = {
  padding: '0.25rem',
  color: '#ef4444',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.875rem',
  transition: 'color 0.2s',
  ':hover': {
    color: '#dc2626'
  }
};

// 按钮样式
export const buttonPrimary = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '0.375rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  fontSize: '0.875rem',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#2563eb'
  },
  ':disabled': {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  }
};

export const buttonSecondary = {
  padding: '0.5rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  backgroundColor: 'white',
  color: '#374151',
  fontSize: '0.875rem',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#f9fafb'
  }
};

// 表单验证样式
export const errorText = {
  color: '#ef4444',
  fontSize: '0.75rem',
  marginTop: '0.25rem'
};

export const requiredMark = {
  color: '#ef4444',
  marginLeft: '0.125rem'
};

// 加载和禁用状态
export const loadingSpinner = {
  border: '2px solid #f3f4f6',
  borderTop: '2px solid #3b82f6',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
  animation: 'spin 1s linear infinite'
};

// 响应式样式工具函数
export const getResponsiveStyles = (baseStyles, responsiveStyles = {}) => {
  return {
    ...baseStyles,
    ...responsiveStyles
  };
};

// 动画关键帧
export const formAnimations = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
`;

// 为了保持向后兼容，保留默认导出
export default {
  modalOverlay,
  modalContainer,
  modalHeader,
  modalFooter,
  modalCloseButton,
  formContainer,
  formGrid,
  inputLabel,
  inputField,
  textareaField,
  selectField,
  sectionTitle,
  itemGrid,
  itemListHeader,
  itemRow,
  deleteButton,
  buttonPrimary,
  buttonSecondary,
  errorText,
  requiredMark,
  loadingSpinner,
  getResponsiveStyles
};