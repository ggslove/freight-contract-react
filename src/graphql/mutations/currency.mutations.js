// 货币相关的GraphQL变更 - 与后端schema完全匹配

export const CURRENCY_MUTATIONS = {
  // 创建货币
  CREATE_CURRENCY: `
    mutation CreateCurrency(
      $code: String!
      $name: String!
      $symbol: String!
      $exchangeRate: Float!
    ) {
      createCurrency(
        code: $code
        name: $name
        symbol: $symbol
        exchangeRate: $exchangeRate
      ) {
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

  // 更新货币
  UPDATE_CURRENCY: `
    mutation UpdateCurrency(
      $id: ID!
      $name: String!
      $symbol: String!
      $exchangeRate: Float!
      $isActive: Boolean!
    ) {
      updateCurrency(
        id: $id
        name: $name
        symbol: $symbol
        exchangeRate: $exchangeRate
        isActive: $isActive
      ) {
        id
        code
        name
        symbol
        exchangeRate
        isActive
        updatedAt
      }
    }
  `,

  // 删除货币
  DELETE_CURRENCY: `
    mutation DeleteCurrency($id: ID!) {
      deleteCurrency(id: $id)
    }
  `
};