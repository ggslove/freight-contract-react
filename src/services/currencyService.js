import client from '../apollo-client';
import { gql } from '@apollo/client';
import {CURRENCY_QUERIES} from '../graphql/queries/currency.queries';
import {CURRENCY_MUTATIONS} from '../graphql/mutations/currency.mutations';
const  {
  GET_ALL_CURRENCIES,
  GET_ACTIVE_CURRENCIES,
  GET_CURRENCY_BY_ID,
  GET_CURRENCY_BY_CODE
}=CURRENCY_QUERIES;
const  {
  CREATE_CURRENCY,
  UPDATE_CURRENCY,
  DELETE_CURRENCY
} =CURRENCY_MUTATIONS;

 const currencyService = {
  // 查询所有币种
  async getAllCurrencies() {
    const { data } = await client.query({
      query: gql(GET_ALL_CURRENCIES),
      fetchPolicy: 'network-only'
    });
    return data.currencies;
  },

  // 查询活跃币种
  async getActiveCurrencies() {
    const { data } = await client.query({
      query: gql(GET_ACTIVE_CURRENCIES),
      fetchPolicy: 'cache-first'
    });
    return data.activeCurrencies;
  },

  // 根据ID查询币种
  async getCurrencyById(id) {
    const { data } = await client.query({
      query: gql(GET_CURRENCY_BY_ID),
      variables: { id }
    });
    return data.currencyById;
  },

  // 根据代码查询币种
  async getCurrencyByCode(code) {
    const { data } = await client.query({
      query: gql(GET_CURRENCY_BY_CODE),
      variables: { code }
    });
    return data.currencyByCode;
  },


  // 创建币种
  async createCurrency(currencyData) {
    const { data } = await client.mutate({
      mutation: gql(CREATE_CURRENCY),
      variables: currencyData,
      refetchQueries: [
        { query: GET_ALL_CURRENCIES },
        { query: GET_ACTIVE_CURRENCIES }
      ]
    });
    return data.createCurrency;
  },

  // 更新币种
  async updateCurrency(id, currencyData) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_CURRENCY),
      variables: { id, ...currencyData },
      refetchQueries: [
        { query: GET_ALL_CURRENCIES },
        { query: GET_ACTIVE_CURRENCIES }
      ]
    });
    return data.updateCurrency;
  },

  // 删除币种
  async deleteCurrency(id) {
    const { data } = await client.mutate({
      mutation: gql(DELETE_CURRENCY),
      variables: { id },
      refetchQueries: [
        { query: GET_CURRENCIES },
        { query: GET_ACTIVE_CURRENCIES }
      ]
    });
    return data.deleteCurrency;
  }
};

export default currencyService;