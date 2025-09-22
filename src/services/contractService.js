import client from '../apollo-client';
import { gql } from '@apollo/client';
import CONTRACT_MUTATIONS from '../graphql/mutations/contract.mutations';
const {CREATE_CONTRACT,DELETE_CONTRACT} = CONTRACT_MUTATIONS;
// 合同相关服务
const contractService = {
  // 获取分页合同列表
  async getContractsPaginated(first, after) {
      const { data } = await client.query({
        query: gql`
          query GetContractsPaginated($first: Int!, $after: String) {
            contracts(first: $first, after: $after) {
              edges {
                node {
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
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              totalCount
            }
          }
        `,
        variables: { first, after }
      });

      return {
        contracts: data.contracts.edges.map(edge => edge.node),
        pageInfo: data.contracts.pageInfo,
        totalCount: data.contracts.totalCount
      };
  
  },

  // 根据状态获取分页合同
  async getContractsByStatusPaginated(status, first, after) {
      const { data } = await client.query({
        query: gql`
          query GetContractsByStatusPaginated($status: String!, $first: Int!, $after: String) {
            contractsByStatus(status: $status, first: $first, after: $after) {
              edges {
                node {
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
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              totalCount
            }
          }
        `,
        variables: { status, first, after }
      });

      return {
        contracts: data.contractsByStatus.edges.map(edge => edge.node),
        pageInfo: data.contractsByStatus.pageInfo,
        totalCount: data.contractsByStatus.totalCount
      };
 
  },

  // 搜索分页合同
  async searchContractsPaginated(searchTerm, first, after) {
      const { data } = await client.query({
        query: gql`
          query SearchContractsPaginated($searchTerm: String!, $first: Int!, $after: String) {
            searchContracts(searchTerm: $searchTerm, first: $first, after: $after) {
              edges {
                node {
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
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              totalCount
            }
          }
        `,
        variables: { searchTerm, first, after }
      });

      return {
        contracts: data.searchContracts.edges.map(edge => edge.node),
        pageInfo: data.searchContracts.pageInfo,
        totalCount: data.searchContracts.totalCount
      };

  },

  // 获取所有合同（不分页）
  async getAllContracts() {
      const { data } = await client.query({
        query: gql`
          query GetAllContracts {
            getAllContracts {
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
        `
      });
      return data.getAllContracts;
  },

  // 根据状态获取合同（不分页）
  async getContractsByStatus(status) {
      const { data } = await client.query({
        query: gql`
          query GetContractsByStatus($status: String!) {
            getContractsByStatus(status: $status) {
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
        variables: { status }
      });
      return data.getContractsByStatus;
  },

  // 搜索合同（不分页）
  async searchContracts(searchTerm) {
      const { data } = await client.query({
        query: gql`
          query SearchContracts($searchTerm: String!) {
            searchContracts(searchTerm: $searchTerm) {
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
        variables: { searchTerm }
      });
      return data.searchContracts;
  },

  // 创建合同
  async createContract(contractData) {
      const { data } = await client.mutate({
        mutation: gql(CREATE_CONTRACT),
        variables: { 
          contractInput: contractData ,
          receivableInputs: contractData.receivables, 
          payableInputs: contractData.payables},
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
        mutation: gql`
          mutation DeleteContract($id: ID!) {
            deleteContract(id: $id) {
              id
            }
          }
        `,
        variables: { id }
      });
      return data.deleteContract;
  }
};

export default contractService;