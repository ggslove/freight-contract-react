import client from '../apollo-client';
import { gql } from '@apollo/client/core';
import { CONTRACT_QUERIES } from '../graphql/queries/contract.queries.js';
import { CONTRACT_MUTATIONS } from '../graphql/mutations/contract.mutations.js';

// 从现有查询和变更中提取
const {
  GET_ALL_CONTRACTS,
  GET_CONTRACT_BY_ID,
  SEARCH_CONTRACTS,
  GET_CONTRACTS_BY_STATUS
} = CONTRACT_QUERIES;

const {
  CREATE_CONTRACT,
  UPDATE_CONTRACT,
  DELETE_CONTRACT,
  CREATE_RECEIVABLE,
  UPDATE_RECEIVABLE,
  DELETE_RECEIVABLE,
  CREATE_PAYABLE,
  UPDATE_PAYABLE,
  DELETE_PAYABLE
} = CONTRACT_MUTATIONS;

const contractService = {
  // 获取所有合同
  async getAllContracts() {
    const { data } = await client.query({
      query: gql(GET_ALL_CONTRACTS),
      fetchPolicy: 'network-only'
    });
    return data.contracts;
  },

  // 根据ID获取合同
  async getContractById(id) {
    const { data } = await client.query({
      query: gql(GET_CONTRACT_BY_ID),
      variables: { id },
      fetchPolicy: 'network-only'
    });
    return data.contract;
  },

  // 创建合同
  async createContract(contractData) {
    const { data } = await client.mutate({
      mutation: gql(CREATE_CONTRACT),
      variables: contractData
    });
    return data.createContract;
  },

  // 更新合同
  async updateContract(id, contractData) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_CONTRACT),
      variables: { id, ...contractData }
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
  },

  // 搜索合同
  async searchContracts(keyword) {
    const { data } = await client.query({
      query: gql(SEARCH_CONTRACTS),
      variables: { keyword },
      fetchPolicy: 'network-only'
    });
    return data.searchContracts;
  },

  // 根据状态获取合同
  async getContractsByStatus(status) {
    const { data } = await client.query({
      query: gql(GET_CONTRACTS_BY_STATUS),
      variables: { status },
      fetchPolicy: 'network-only'
    });
    return data.contractsByStatus;
  },

  // 创建应收记录
  async createReceivable(receivableData) {
    const { data } = await client.mutate({
      mutation: gql(CREATE_RECEIVABLE),
      variables: receivableData
    });
    return data.createReceivable;
  },

  // 更新应收记录
  async updateReceivable(id, receivableData) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_RECEIVABLE),
      variables: { id, ...receivableData }
    });
    return data.updateReceivable;
  },

  // 删除应收记录
  async deleteReceivable(id) {
    const { data } = await client.mutate({
      mutation: gql(DELETE_RECEIVABLE),
      variables: { id }
    });
    return data.deleteReceivable;
  },

  // 创建应付记录
  async createPayable(payableData) {
    const { data } = await client.mutate({
      mutation: gql(CREATE_PAYABLE),
      variables: payableData
    });
    return data.createPayable;
  },

  // 更新应付记录
  async updatePayable(id, payableData) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_PAYABLE),
      variables: { id, ...payableData }
    });
    return data.updatePayable;
  },

  // 删除应付记录
  async deletePayable(id) {
    const { data } = await client.mutate({
      mutation: gql(DELETE_PAYABLE),
      variables: { id }
    });
    return data.deletePayable;
  },


};

export default contractService;