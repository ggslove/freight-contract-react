// 合同相关的GraphQL查询

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
        currency
        status
        contractDate
        deliveryDate
        description
        receivables {
          id
          customerName
          amount
          currency
          status
          dueDate
        }
        payables {
          id
          supplierName
          amount
          currency
          status
          dueDate
        }
      }
    }
  `,

  // 根据合同ID获取应收
  GET_RECEIVABLES_BY_CONTRACT: `
    query GetReceivablesByContract($contractId: ID!) {
      receivablesByContract(contractId: $contractId) {
        id
        customerName
        amount
        currency
        status
        dueDate
      }
    }
  `,

  // 根据合同ID获取应付
  GET_PAYABLES_BY_CONTRACT: `
    query GetPayablesByContract($contractId: ID!) {
      payablesByContract(contractId: $contractId) {
        id
        supplierName
        amount
        currency
        status
        dueDate
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
        currency
        status
        contractDate
        deliveryDate
        description
        receivables {
          id
          customerName
          amount
          currency
          status
          dueDate
        }
        payables {
          id
          supplierName
          amount
          currency
          status
          dueDate
        }
      }
    }
  `,

  // 搜索合同
  SEARCH_CONTRACTS: `
    query SearchContracts($keyword: String!) {
      searchContracts(keyword: $keyword) {
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
        receivables {
          id
          customerName
          amount
          currency
          status
          dueDate
        }
        payables {
          id
          supplierName
          amount
          currency
          status
          dueDate
        }
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
        currency
        status
        contractDate
        deliveryDate
        description
        receivables {
          id
          customerName
          amount
          currency
          status
          dueDate
        }
        payables {
          id
          supplierName
          amount
          currency
          status
          dueDate
        }
      }
    }
  `
};