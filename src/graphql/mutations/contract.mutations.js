// 合同相关的GraphQL变更

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
      }
    }
  `,

  // 删除合同
  DELETE_CONTRACT: `
    mutation DeleteContract($id: ID!) {
      deleteContract(id: $id)
    }
  `,

  // 创建应收
  CREATE_RECEIVABLE: `
    mutation CreateReceivable(
      $contractId: ID!
      $customerName: String!
      $amount: Float!
      $currency: String!
      $status: ReceivableStatus!
      $dueDate: DateTime
    ) {
      createReceivable(
        contractId: $contractId
        customerName: $customerName
        amount: $amount
        currency: $currency
        status: $status
        dueDate: $dueDate
      ) {
        id
        customerName
        amount
        currency
        status
        dueDate
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
      $status: ReceivableStatus
      $dueDate: DateTime
    ) {
      updateReceivable(
        id: $id
        customerName: $customerName
        amount: $amount
        currency: $currency
        status: $status
        dueDate: $dueDate
      ) {
        id
        customerName
        amount
        currency
        status
        dueDate
      }
    }
  `,

  // 删除应收
  DELETE_RECEIVABLE: `
    mutation DeleteReceivable($id: ID!) {
      deleteReceivable(id: $id)
    }
  `,

  // 创建应付
  CREATE_PAYABLE: `
    mutation CreatePayable(
      $contractId: ID!
      $supplierName: String!
      $amount: Float!
      $currency: String!
      $status: PayableStatus!
      $dueDate: DateTime
    ) {
      createPayable(
        contractId: $contractId
        supplierName: $supplierName
        amount: $amount
        currency: $currency
        status: $status
        dueDate: $dueDate
      ) {
        id
        supplierName
        amount
        currency
        status
        dueDate
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
      $status: PayableStatus
      $dueDate: DateTime
    ) {
      updatePayable(
        id: $id
        supplierName: $supplierName
        amount: $amount
        currency: $currency
        status: $status
        dueDate: $dueDate
      ) {
        id
        supplierName
        amount
        currency
        status
        dueDate
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