import showErrorToast from './errorToast';
import showSuccessToast from './successToast';

// 全局错误处理配置
class GlobalErrorHandler {
  constructor() {
    this.setupGlobalHandlers();
  }

  // 设置全局错误处理
  setupGlobalHandlers() {
    // 全局未捕获的Promise错误
    window.addEventListener('unhandledrejection', (event) => {
      console.error('全局未处理的Promise错误:', event.reason);
      this.handleError(event.reason);
      event.preventDefault();
    });

    // 全局JavaScript错误
    window.addEventListener('error', (event) => {
      console.error('全局JavaScript错误:', event.error);
      this.handleError(event.error);
    });
  }

  // 统一的错误处理
  handleError(error, context = '') {
    console.error('🚨 全局错误:', error);
    
    let errorMessage = '操作失败';
    
    if (error?.response) {
      // GraphQL错误
      if (error.response.errors) {
        errorMessage = error.response.errors.map(e => e.message).join(', ');
      } else {
        errorMessage = error.response.statusText || '服务器错误';
      }
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    const message = context ? `${context}: ${errorMessage}` : errorMessage;
    showErrorToast(message);
  }

  // 统一的异步操作包装器
  async safeAsync(asyncFn, context = '') {
    try {
      return await asyncFn();
    } catch (error) {
      this.handleError(error, context);
      throw error; // 让调用者可以进一步处理
    }
  }

  // 统一的同步操作包装器
  safeSync(fn, context = '') {
    try {
      return fn();
    } catch (error) {
      this.handleError(error, context);
      throw error;
    }
  }

  // 成功消息的统一处理
  showSuccess(message) {
    showSuccessToast(message);
  }
}

// 创建全局实例
const globalErrorHandler = new GlobalErrorHandler();

// 导出工具函数
export const safeAsync = (asyncFn, context) => globalErrorHandler.safeAsync(asyncFn, context);
export const safeSync = (fn, context) => globalErrorHandler.safeSync(fn, context);
export const showSuccess = (message) => globalErrorHandler.showSuccess(message);
export const handleError = (error, context) => globalErrorHandler.handleError(error, context);

// 默认导出
export default globalErrorHandler;