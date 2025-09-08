// 应收相关的GraphQL变更

export const RECEIVABLE_MUTATIONS = {
  // 创建应收
  CREATE_RECEIVABLE: `
    mutation CreateReceivable(
      $contractId: ID!
      $financeItem: String!
      $amount: String!
      $currencyCode: String!
      $dueDate: DateTime
      $status: ContractStatus!
    ) {
      createReceivable(
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

  // 更新应收
  UPDATE_RECEIVABLE: `
    mutation UpdateReceivable(
      $id: ID!
      $financeItem: String
      $amount: String
      $currencyCode: String
      $dueDate: DateTime
      $status: ContractStatus
    ) {
      updateReceivable(
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

  // 删除应收
  DELETE_RECEIVABLE: `
    mutation DeleteReceivable($id: ID!) {
      deleteReceivable(id: $id)
    }
  `
};