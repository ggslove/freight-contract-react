// 合同相关的GraphQL查询 - 与后端schema完全匹配

export const CONTRACT_QUERIES = {
  // 获取所有合同（分页，支持过滤条件）
  GET_CONTRACTS_PAGINATED: `
    query GetContractsPaginated($first: Int!, $after: String, $filter: ContractQueryInput, $sort: String) {
      contracts(first: $first, after: $after, filter: $filter, sort: $sort) {
        edges {
          node {
            id
            businessNo
            billNo
            salesman
            theClient
            invoiceNo
            status
            quantity
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
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `,
  // 根据状态获取合同（分页）
  GET_CONTRACTS_BY_STATUS_PAGINATED: `
    query GetContractsByStatusPaginated($status: ContractStatus!, $first: Int!, $after: String) {
      contractsByStatus(status: $status, first: $first, after: $after) {
        edges {
          node {
            id
            businessNo
            billNo
            salesman
            theClient
            invoiceNo
            status
            quantity
            dateOfReceipt
            dateOfSailing
            remarks
            createdAt
            updatedAt
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `,

  // 根据状态获取合同（不分页）
  GET_CONTRACTS_BY_STATUS: `
    query GetContractsByStatus($status: ContractStatus!) {
      contractsByStatus(status: $status) {
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

  // 根据ID获取合同
  GET_CONTRACT_BY_ID: `
    query GetContractById($id: ID!) {
      contract(id: $id) {
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

  // 搜索合同（分页）
  SEARCH_CONTRACTS_PAGINATED: `
    query SearchContractsPaginated($query: String!, $first: Int!, $after: String) {
      searchContracts(query: $query, first: $first, after: $after) {
        edges {
          node {
            id
            businessNo
            billNo
            salesman
            theClient
            invoiceNo
            status
            quantity
            dateOfReceipt
            dateOfSailing
            remarks
            createdAt
            updatedAt
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `,

  // 获取应收款列表
  GET_ALL_RECEIVABLES: `
    query GetAllReceivables {
      receivables {
        id
        financeItem
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
        financeItem
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
        financeItem
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
        financeItem
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
        financeItem
        amount
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  `
};