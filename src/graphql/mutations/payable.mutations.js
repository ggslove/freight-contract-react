// 应付相关的GraphQL变更

export const PAYABLE_MUTATIONS = {
  // 创建应付
  CREATE_PAYABLE: `
    mutation CreatePayable(
      $contractId: ID!
      $financeItem: String!
      $amount: String!
      $currencyCode: String!
      $dueDate: DateTime
      $status: ContractStatus!
    ) {
      createPayable(
        contractId: $contractId
        financeItem: $financeItem
        amount: $amount
        currencyCode: $currencyCode
        dueDate: $dueDate
        status: $status
      ) {
        id
        financeItem
        amount
        currency {
          code
          name
          symbol
        }
        dueDate
        status
      }
    }
  `,

  // 更新应付
  UPDATE_PAYABLE: `
    mutation UpdatePayable(
      $id: ID!
      $financeItem: String
      $amount: String
      $currencyCode: String
      $dueDate: DateTime
      $status: ContractStatus
    ) {
      updatePayable(
        id: $id
        financeItem: $financeItem
        amount: $amount
        currencyCode: $currencyCode
        dueDate: $dueDate
        status: $status
      ) {
        id
        financeItem
        amount
        currency {
          code
          name
          symbol
        }
        dueDate
        status
      }
    }
  `,

  // 删除应付
  DELETE_PAYABLE: `
    mutation DeletePayable($id: ID!) {
      deletePayable(id: $id)
    }
  `
};