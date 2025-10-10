import { gql } from '@apollo/client';
import CONTRACT_MUTATIONS from '../graphql/mutations/contract.mutations';
import { CONTRACT_QUERIES } from '../graphql/queries/contract.queries';
import client from '../apollo-client';

const { CREATE_CONTRACT, DELETE_CONTRACT } = CONTRACT_MUTATIONS;
const {
  GET_CONTRACTS_PAGINATED,
  GET_ALL_CONTRACTS,
  GET_CONTRACTS_BY_STATUS,
  GET_CONTRACT_STATS
} = CONTRACT_QUERIES;

// 合同相关服务
const contractService = {
  // 获取分页合同列表（支持过滤条件）
  async getContractsPaginated(first, after, filter = {}) {
    // 构建filter对象
    const filterObj = {
      searchTerm: filter.searchTerm || null,
      status: filter.status || null,
      startDate: filter.startDate || null,
      endDate: filter.endDate || null
    };
    
    // 移除空值，避免不必要的参数传递
    Object.keys(filterObj).forEach(key => {
      if (filterObj[key] === null) {
        delete filterObj[key];
      }
    });

    const { data } = await client.query({
      query: gql(GET_CONTRACTS_PAGINATED),
      variables: {
        first,
        after,
        filter: Object.keys(filterObj).length > 0 ? filterObj : undefined
      }
    });

    return {
      contracts: data.contracts.edges.map(edge => edge.node),
      pageInfo: data.contracts.pageInfo,
      totalCount: data.contracts.totalCount
    };
  },

  // 为了向后兼容，保留旧的方法，但内部调用新方法
  async getContractsByStatusPaginated(status, first, after) {
    return this.getContractsPaginated(first, after, { status });
  },

  // 为了向后兼容，保留旧的方法，但内部调用新方法
  async searchContractsPaginated(searchTerm, first, after) {
    return this.getContractsPaginated(first, after, { searchTerm });
  },

  // 获取所有合同（不分页）
  async getAllContracts() {
    const { data } = await client.query({
      query: gql(GET_ALL_CONTRACTS)
    });
    return data.contracts;
  },

  // 根据状态获取合同（不分页）
  async getContractsByStatus(status) {
    const { data } = await client.query({
      query: gql(GET_CONTRACTS_BY_STATUS),
      variables: { status }
    });
    return data.contractsByStatus;
  },

  // 获取合同统计数据（按状态分组，支持过滤条件）
  async getContractStats(filter = {}) {
    // 构建filter对象
    const filterObj = {
      searchTerm: filter.searchTerm || null,
      status: filter.status || null,
      startDate: filter.startDate || null,
      endDate: filter.endDate || null
    };
    
    // 移除空值，避免不必要的参数传递
    Object.keys(filterObj).forEach(key => {
      if (filterObj[key] === null) {
        delete filterObj[key];
      }
    });

    const { data } = await client.query({
      query: gql(GET_CONTRACT_STATS),
      variables: Object.keys(filterObj).length > 0 ? { filter: filterObj } : undefined
    });
    return data.contractStats || [];
  },

  // 创建合同
  async createContract(contractData) {
    const { data } = await client.mutate({
      mutation: gql(CREATE_CONTRACT),
      variables: {
        contractInput: contractData,
        receivableInputs: contractData.receivables || [],
        payableInputs: contractData.payables || []
      }
    });
    return data.createContract;
  },

  // 更新合同
  async updateContract(id, contractData) {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UpdateContract($id: ID!, $input: ContractInput!) {
          updateContract(id: $id, input: $input) {
            id
            businessNo
            billNo
            theClient
            amount
            dateOfReceipt
            status
            salesman
            invoiceNo
            dateOfSailing
            remarks
          }
        }
      `,
      variables: { id, input: contractData }
    });
    return data.updateContract;
  },

  // 删除合同
  async deleteContract(id) {
    const { data } = await client.mutate({
      mutation: gql(DELETE_CONTRACT),
      variables: { id }
    });
    return data.deleteContract;
  }
};

export default contractService;