// 合同相关的GraphQL查询 - 与后端schema完全匹配

export const CONTRACT_QUERIES = {
  // 获取所有合同
  GET_ALL_CONTRACTS: `
    query GetAllContracts {
      contracts {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        status
        contractDate
        deliveryDate
        description
        createdAt
        updatedAt
      }
    }
  `,

  // 根据ID获取合同
  GET_CONTRACT_BY_ID: `
    query GetContractById($id: ID!) {
      contract(id: $id) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        status
        contractDate
        deliveryDate
        description
        receivables {
          id
          customerName
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
          supplierName
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

  // 根据状态获取合同
  GET_CONTRACTS_BY_STATUS: `
    query GetContractsByStatus($status: ContractStatus!) {
      contractsByStatus(status: $status) {
        id
        businessNo
        customerName
        billNo
        salesman
        amount
        status
        contractDate
        deliveryDate
        description
        createdAt
        updatedAt
      }
    }
  `,

  // 获取应收款列表
  GET_ALL_RECEIVABLES: `
    query GetAllReceivables {
      receivables {
        id
        customerName
        amount
       
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  `,

  // 根据ID获取应收款
  GET_RECEIVABLE_BY_ID: `
    query GetReceivableById($id: ID!) {
      receivable(id: $id) {
        id
        customerName
        amount
       
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  `,

  // 根据合同ID获取应收款
  GET_RECEIVABLES_BY_CONTRACT: `
    query GetReceivablesByContract($contractId: ID!) {
      receivablesByContract(contractId: $contractId) {
        id
        customerName
        amount
       
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  `,

  // 获取应付款列表
  GET_ALL_PAYABLES: `
    query GetAllPayables {
      payables {
        id
        supplierName
        amount
       
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  `,

  // 根据ID获取应付款
  GET_PAYABLE_BY_ID: `
    query GetPayableById($id: ID!) {
      payable(id: $id) {
        id
        supplierName
        amount
       
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  `,

  // 根据合同ID获取应付款
  GET_PAYABLES_BY_CONTRACT: `
    query GetPayablesByContract($contractId: ID!) {
      payablesByContract(contractId: $contractId) {
        id
        supplierName
        amount
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  `
};