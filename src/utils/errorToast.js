// 全局错误提示工具
let toastContainer = null;

const createToastContainer = () => {
  if (toastContainer) return toastContainer;
  
  toastContainer = document.createElement('div');
  toastContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    width: 100%;
  `;
  
  document.body.appendChild(toastContainer);
  return toastContainer;
};

const showErrorToast = (message, duration = 5000) => {
  const container = createToastContainer();
  
  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #ef4444;
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
  
  if (!document.querySelector('#error-toast-styles')) {
    style.id = 'error-toast-styles';
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

export default showErrorToast;