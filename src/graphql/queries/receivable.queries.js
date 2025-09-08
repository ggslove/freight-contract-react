// 应收相关的GraphQL查询

export const RECEIVABLE_QUERIES = {
  // 获取所有应收记录
  GET_ALL_RECEIVABLES: `
    query GetAllReceivables {
      receivables {
        id
        financeItem
        amount
        currency {
          code
          name
          symbol
        }
        status
        dueDate
        contract {
          id
          businessNo
          theClient
        }
      }
    }
  `,

  // 根据ID获取应收记录
  GET_RECEIVABLE_BY_ID: `
    query GetReceivableById($id: ID!) {
      receivable(id: $id) {
        id
        financeItem
        amount
        currency {\n          code\n          name\n          symbol\n        }
        status
        dueDate
        contract {
          id
          businessNo
          theClient
        }
      }
    }
  `,

  // 根据合同ID获取应收记录
  GET_RECEIVABLES_BY_CONTRACT: `
    query GetReceivablesByContract($contractId: ID!) {
      receivablesByContract(contractId: $contractId) {
        id
        financeItem
        amount
        currency {\n          code\n          name\n          symbol\n        }
        status
        dueDate
      }
    }
  `,

  // 根据状态获取应收记录
  GET_RECEIVABLES_BY_STATUS: `
    query GetReceivablesByStatus($status: ReceivableStatus!) {
      receivablesByStatus(status: $status) {
        id
        financeItem
        amount
        currency {\n          code\n          name\n          symbol\n        }
        status
        dueDate
        contract {
          id
          businessNo
        }
      }
    }
  `
};