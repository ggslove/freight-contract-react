// 应付相关的GraphQL变更

export const PAYABLE_MUTATIONS = {
  // 创建应付
  CREATE_PAYABLE: `
    mutation CreatePayable(
      $contractId: ID!
      $supplierName: String!
      $amount: Float!
      $currency: String!
      $dueDate: DateTime
      $status: PayableStatus!
    ) {
      createPayable(
        contractId: $contractId
        supplierName: $supplierName
        amount: $amount
        currency: $currency
        dueDate: $dueDate
        status: $status
      ) {
        id
        supplierName
        amount
        currency
        dueDate
        status
      }
    }
  `,

  // 更新应付
  UPDATE_PAYABLE: `
    mutation UpdatePayable(
      $id: ID!
      $supplierName: String
      $amount: Float
      $currency: String
      $dueDate: DateTime
      $status: PayableStatus
    ) {
      updatePayable(
        id: $id
        supplierName: $supplierName
        amount: $amount
        currency: $currency
        dueDate: $dueDate
        status: $status
      ) {
        id
        supplierName
        amount
        currency
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