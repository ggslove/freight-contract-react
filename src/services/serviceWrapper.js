import { safeAsync } from '../utils/globalErrorHandler';

// 服务方法包装器
export const createServiceWrapper = (service) => {
  const wrappedService = {};
  
  // 遍历服务的所有方法
  Object.getOwnPropertyNames(service).forEach(key => {
    if (typeof service[key] === 'function') {
      // 包装异步方法
      wrappedService[key] = async (...args) => {
        return safeAsync(async () => {
          const result = await service[key](...args);
          return result;
        }, `${service.constructor.name || 'Service'}.${key}`);
      };
    } else {
      // 复制非函数属性
      wrappedService[key] = service[key];
    }
  });
  
  return wrappedService;
};

// 创建自动包装的服务
export const wrapServices = (services) => {
  const wrappedServices = {};
  
  Object.keys(services).forEach(serviceName => {
    wrappedServices[serviceName] = createServiceWrapper(services[serviceName]);
  });
  
  return wrappedServices;
};