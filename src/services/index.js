import userService from './userService';
import roleService from './roleService';
import currencyService from './currencyService';
import contractService from './contractService';
import { createServiceWrapper } from './serviceWrapper';

// 包装所有服务，自动处理错误
export const services = {
  user: createServiceWrapper(userService),
  role: createServiceWrapper(roleService),
  currency: createServiceWrapper(currencyService),
  contract: createServiceWrapper(contractService),
};

// 也可以单独导出原始服务
export { userService, roleService, currencyService, contractService };

// 默认导出包装后的服务
export default services;