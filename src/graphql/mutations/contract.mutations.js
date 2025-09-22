// 合同相关的GraphQL变更 - 与后端schema完全匹配

 const CONTRACT_MUTATIONS = {
  // 创建合同
  CREATE_CONTRACT: `
    mutation CreateContract(
      $contractInput: ContractInput!
      $receivableInputs: [ReceivableInput!]
      $payableInputs: [PayableInput!]
    ) {
      createContract(
        contractInput: $contractInput
        receivableInputs: $receivableInputs
        payableInputs: $payableInputs
      ) {
        id
        businessNo
        billNo
        salesman
        theClient
        invoiceNo
        quantity
        status
        dateOfReceipt
        dateOfSailing
        remarks
        receivables {
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
          createdAt
          updatedAt
        }
        payables {
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
          createdAt
          updatedAt
        }
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
      $billNo: String
      $salesman: String
      $theClient: String
      $invoiceNo: String
      $amount: String
      $status: ContractStatus
      $dateOfReceipt: DateTime
      $dateOfSailing: DateTime
      $remarks: String
    ) {
      updateContract(
        id: $id
        contractInput: {
          businessNo: $businessNo
          billNo: $billNo
          salesman: $salesman
          theClient: $theClient
          invoiceNo: $invoiceNo
          amount: $amount
          status: $status
          dateOfReceipt: $dateOfReceipt
          dateOfSailing: $dateOfSailing
          remarks: $remarks
        }
      ) {
        id
        businessNo
        billNo
        salesman
        theClient
        invoiceNo
        amount
        status
        dateOfReceipt
        dateOfSailing
        remarks
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
        createdAt
        updatedAt
      }
    }
  `,

  // 更新应收款
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
        createdAt
        updatedAt
      }
    }
  `,

  // 更新应付款
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

export default CONTRACT_MUTATIONS;