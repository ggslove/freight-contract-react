// GraphQL客户端配置
const API_BASE_URL = '/api';

// GraphQL查询构建器
class GraphQLClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async query(query, variables = {}) {
    try {
      const response = await fetch(`${this.baseURL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (error) {
      console.error('GraphQL request failed:', error);
      throw error;
    }
  }

  async mutation(mutation, variables = {}) {
    return this.query(mutation, variables);
  }
}

// 创建全局客户端实例
export const graphqlClient = new GraphQLClient(API_BASE_URL);

// 合同相关的GraphQL查询
export const CONTRACT_QUERIES = {
  // 获取所有合同
  GET_ALL_CONTRACTS: `
    query GetAllContracts {
      contracts {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
      }
    }
  `,

  // 根据ID获取合同
  GET_CONTRACT_BY_ID: `
    query GetContractById($id: ID!) {
      contract(id: $id) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
      }
    }
  `,

  // 搜索合同
  SEARCH_CONTRACTS: `
    query SearchContracts($keyword: String!) {
      searchContracts(keyword: $keyword) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
      }
    }
  `,

  // 根据状态获取合同
  GET_CONTRACTS_BY_STATUS: `
    query GetContractsByStatus($status: ContractStatus!) {
      contractsByStatus(status: $status) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
      }
    }
  `
};

// 合同相关的GraphQL变更
export const CONTRACT_MUTATIONS = {
  // 创建合同
  CREATE_CONTRACT: `
    mutation CreateContract(
      $businessNo: String!
      $customerName: String!
      $billNo: String
      $salesman: String
      $amount: Float!
      $currency: String!
      $status: ContractStatus!
      $contractDate: DateTime
      $deliveryDate: DateTime
      $description: String
    ) {
      createContract(
        businessNo: $businessNo
        customerName: $customerName
        billNo: $billNo
        salesman: $salesman
        amount: $amount
        currency: $currency
        status: $status
        contractDate: $contractDate
        deliveryDate: $deliveryDate
        description: $description
      ) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
      }
    }
  `,

  // 更新合同
  UPDATE_CONTRACT: `
    mutation UpdateContract(
      $id: ID!
      $businessNo: String
      $customerName: String
      $billNo: String
      $salesman: String
      $amount: Float
      $currency: String
      $status: ContractStatus
      $contractDate: DateTime
      $deliveryDate: DateTime
      $description: String
    ) {
      updateContract(
        id: $id
        businessNo: $businessNo
        customerName: $customerName
        billNo: $billNo
        salesman: $salesman
        amount: $amount
        currency: $currency
        status: $status
        contractDate: $contractDate
        deliveryDate: $deliveryDate
        description: $description
      ) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
      }
    }
  `,

  // 删除合同
  DELETE_CONTRACT: `
    mutation DeleteContract($id: ID!) {
      deleteContract(id: $id)
    }
  `
};

// 工具函数：格式化日期
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// 工具函数：格式化货币
export const formatCurrency = (amount, currency = 'CNY') => {
  if (isNaN(amount)) return '¥0.00';
  
  const symbol = currency === 'USD' ? '$' : 
                 currency === 'EUR' ? '€' : 
                 currency === 'GBP' ? '£' : '¥';
  
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
};

// 工具函数：映射状态显示
export const formatStatus = (status) => {
  const statusMap = {
    'PENDING': '待处理',
    'PROCESSING': '进行中',
    'COMPLETED': '已完成',
    'CANCELLED': '已取消'
  };
  return statusMap[status] || status;
};