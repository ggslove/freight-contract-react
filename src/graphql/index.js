// GraphQL模块统一导出

// 客户端
export { graphqlClient } from './client.js';

// 查询
export { CONTRACT_QUERIES } from './queries/contract.queries.js';
export { RECEIVABLE_QUERIES } from './queries/receivable.queries.js';
export { PAYABLE_QUERIES } from './queries/payable.queries.js';

// 变更
export { CONTRACT_MUTATIONS } from './mutations/contract.mutations.js';
export { RECEIVABLE_MUTATIONS } from './mutations/receivable.mutations.js';
export { PAYABLE_MUTATIONS } from './mutations/payable.mutations.js';
