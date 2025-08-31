// 应收相关的GraphQL变更

export const RECEIVABLE_MUTATIONS = {
  // 创建应收
  CREATE_RECEIVABLE: `
    mutation CreateReceivable(
      $contractId: ID!
      $customerName: String!
      $amount: Float!
      $currency: String!
      $dueDate: DateTime
      $status: ReceivableStatus!
    ) {
      createReceivable(
        contractId: $contractId
        customerName: $customerName
        amount: $amount
        currency: $currency
        dueDate: $dueDate
        status: $status
      ) {
        id
        customerName
        amount
        currency
        dueDate
        status
      }
    }
  `,

  // 更新应收
  UPDATE_RECEIVABLE: `
    mutation UpdateReceivable(
      $id: ID!
      $customerName: String
      $amount: Float
      $currency: String
      $dueDate: DateTime
      $status: ReceivableStatus
    ) {
      updateReceivable(
        id: $id
        customerName: $customerName
        amount: $amount
        currency: $currency
        dueDate: $dueDate
        status: $status
      ) {
        id
        customerName
        amount
        currency
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