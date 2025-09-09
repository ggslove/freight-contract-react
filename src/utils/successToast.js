// 全局成功提示工具
let successToastContainer = null;

const createSuccessToastContainer = () => {
  if (successToastContainer) return successToastContainer;
  
  successToastContainer = document.createElement('div');
  successToastContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    width: 100%;
  `;
  
  document.body.appendChild(successToastContainer);
  return successToastContainer;
};

const showSuccessToast = (message, duration = 3000) => {
  const container = createSuccessToastContainer();
  
  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #10b981;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    line-height: 1.4;
    animation: slideIn 0.3s ease-out;
    cursor: pointer;
    transition: opacity 0.3s ease;
  `;
  
  toast.textContent = message;
  
  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  
  if (!document.querySelector('#success-toast-styles')) {
    style.id = 'success-toast-styles';
    document.head.appendChild(style);
  }
  
  // 点击关闭
  toast.addEventListener('click', () => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  });
  
  container.appendChild(toast);
  
  // 自动关闭
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  }, duration);
};

export default showSuccessToast;