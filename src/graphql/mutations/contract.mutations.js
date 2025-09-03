// 合同相关的GraphQL变更 - 与后端schema完全匹配

export const CONTRACT_MUTATIONS = {
  // 创建合同
  CREATE_CONTRACT: `
    mutation CreateContract(
      $businessNo: String!
      $customerName: String!
      $billNo: String
      $salesman: String
      $amount: Float!
      $currency: String!
      $status: ContractStatus!
      $contractDate: DateTime
      $deliveryDate: DateTime
      $description: String
    ) {
      createContract(
        businessNo: $businessNo
        customerName: $customerName
        billNo: $billNo
        salesman: $salesman
        amount: $amount
        currency: $currency
        status: $status
        contractDate: $contractDate
        deliveryDate: $deliveryDate
        description: $description
      ) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
        createdAt
        updatedAt
      }
    }
  `,

  // 更新合同
  UPDATE_CONTRACT: `
    mutation UpdateContract(
      $id: ID!
      $businessNo: String
      $customerName: String
      $billNo: String
      $salesman: String
      $amount: Float
      $currency: String
      $status: ContractStatus
      $contractDate: DateTime
      $deliveryDate: DateTime
      $description: String
    ) {
      updateContract(
        id: $id
        businessNo: $businessNo
        customerName: $customerName
        billNo: $billNo
        salesman: $salesman
        amount: $amount
        currency: $currency
        status: $status
        contractDate: $contractDate
        deliveryDate: $deliveryDate
        description: $description
      ) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        currency
        status
        contractDate
        deliveryDate
        description
        createdAt
        updatedAt
      }
    }
  `,

  // 删除合同
  DELETE_CONTRACT: `
    mutation DeleteContract($id: ID!) {
      deleteContract(id: $id)
    }
  `,

  // 创建应收款
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
        createdAt
        updatedAt
      }
    }
  `,

  // 更新应收款
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
        createdAt
        updatedAt
      }
    }
  `,

  // 删除应收款
  DELETE_RECEIVABLE: `
    mutation DeleteReceivable($id: ID!) {
      deleteReceivable(id: $id)
    }
  `,

  // 创建应付款
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
        createdAt
        updatedAt
      }
    }
  `,

  // 更新应付款
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
        createdAt
        updatedAt
      }
    }
  `,

  // 删除应付款
  DELETE_PAYABLE: `
    mutation DeletePayable($id: ID!) {
      deletePayable(id: $id)
    }
  `
};