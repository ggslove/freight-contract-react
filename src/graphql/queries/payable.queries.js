// 应付相关的GraphQL查询

export const PAYABLE_QUERIES = {
  // 获取所有应付记录
  GET_ALL_PAYABLES: `
    query GetAllPayables {
      payables {
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

  // 根据ID获取应付记录
  GET_PAYABLE_BY_ID: `
    query GetPayableById($id: ID!) {
      payable(id: $id) {
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

  // 根据合同ID获取应付记录
  GET_PAYABLES_BY_CONTRACT: `
    query GetPayablesByContract($contractId: ID!) {
      payablesByContract(contractId: $contractId) {
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
      }
    }
  `,

  // 根据状态获取应付记录
  GET_PAYABLES_BY_STATUS: `
    query GetPayablesByStatus($status: PayableStatus!) {
      payablesByStatus(status: $status) {
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
        }
      }
    }
  `
};