// GraphQL模块统一导出

// 客户端
export { graphqlClient } from './client.js';

// 查询
export { CONTRACT_QUERIES } from './queries/contract.queries.js';
export { RECEIVABLE_QUERIES } from './queries/receivable.queries.js';
export { PAYABLE_QUERIES } from './queries/payable.queries.js';
export { USER_QUERIES } from './queries/user.queries.js';
export { ROLE_QUERIES } from './queries/role.queries.js';

// 变更
export { CONTRACT_MUTATIONS } from './mutations/contract.mutations.js';
export { RECEIVABLE_MUTATIONS } from './mutations/receivable.mutations.js';
export { PAYABLE_MUTATIONS } from './mutations/payable.mutations.js';
export { USER_MUTATIONS } from './mutations/user.mutations.js';
export { ROLE_MUTATIONS } from './mutations/role.mutations.js';
