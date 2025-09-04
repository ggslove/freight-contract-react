// 货币相关的GraphQL查询 - 与后端schema完全匹配

export const CURRENCY_QUERIES = {
  // 获取所有货币
  GET_ALL_CURRENCIES: `
    query GetAllCurrencies {
      currencies {
        id
        code
        name
        symbol
        exchangeRate
        isActive
        createdAt
        updatedAt
      }
    }
  `,

  // 获取活跃货币
  GET_ACTIVE_CURRENCIES: `
    query GetActiveCurrencies {
      activeCurrencies {
        id
        code
        name
        symbol
        exchangeRate
      }
    }
  `,

  // 根据ID获取货币
  GET_CURRENCY_BY_ID: `
    query GetCurrencyById($id: ID!) {
      currencyById(id: $id) {
        id
        code
        name
        symbol
        exchangeRate
        isActive
        createdAt
        updatedAt
      }
    }
  `,

  // 根据代码获取货币
  GET_CURRENCY_BY_CODE: `
    query GetCurrencyByCode($code: String!) {
      currencyByCode(code: $code) {
        id
        code
        name
        symbol
        exchangeRate
      }
    }
  `
};