import { describe, it, expect, vi, beforeEach } from 'vitest';
import contractService from './contractService';
import client from '../apollo-client';
import { CONTRACT_QUERIES } from '../graphql/queries/contract.queries';
import CONTRACT_MUTATIONS from '../graphql/mutations/contract.mutations';

// Mock Apollo Client
vi.mock('../apollo-client', () => ({
  default: {
    query: vi.fn(),
    mutate: vi.fn()
  }
}));

// Mock GraphQL queries
vi.mock('../graphql/queries/contract.queries', () => ({
  CONTRACT_QUERIES: {
    GET_CONTRACTS_PAGINATED: 'query GetContractsPaginated($first: Int!, $after: String) { contracts(first: $first, after: $after) { edges { node { id businessNo status } } pageInfo { hasNextPage endCursor } totalCount } }',
    GET_CONTRACTS_BY_STATUS_PAGINATED: 'query GetContractsByStatusPaginated($status: String, $first: Int!, $after: String) { contractsByStatus(status: $status, first: $first, after: $after) { edges { node { id businessNo status } } pageInfo { hasNextPage endCursor } totalCount } }',
    SEARCH_CONTRACTS_PAGINATED: 'query SearchContractsPaginated($query: String!, $first: Int!, $after: String) { searchContracts(query: $query, first: $first, after: $after) { edges { node { id businessNo theClient } } pageInfo { hasNextPage endCursor } totalCount } }',
    GET_ALL_CONTRACTS: 'query GetAllContracts { contracts { id businessNo } }',
    GET_CONTRACTS_BY_STATUS: 'query GetContractsByStatus($status: String) { contractsByStatus(status: $status) { id businessNo status } }',
    GET_CONTRACT_BY_ID: 'query GetContractById($id: ID!) { contract(id: $id) { id businessNo } }'
  }
}));

// Mock GraphQL mutations
vi.mock('../graphql/mutations/contract.mutations', () => ({
  default: {
    CREATE_CONTRACT: 'mutation CreateContract($contractInput: ContractInput!, $receivableInputs: [ReceivableInput!], $payableInputs: [PayableInput!]) { createContract(contractInput: $contractInput, receivableInputs: $receivableInputs, payableInputs: $payableInputs) { id businessNo theClient status } }',
    DELETE_CONTRACT: 'mutation DeleteContract($id: ID!) { deleteContract(id: $id) { id businessNo status } }'
  }
}));

describe('contractService', () => {
  beforeEach(() => {
    // 重置所有mock
    vi.clearAllMocks();
  });

  describe('getContractsPaginated', () => {
    it('should fetch paginated contracts successfully', async () => {
      const mockResponse = {
        data: {
          contracts: {
            edges: [
              { node: { id: '1', businessNo: 'BC001', status: 'PENDING' } },
              { node: { id: '2', businessNo: 'BC002', status: 'COMPLETED' } }
            ],
            pageInfo: { hasNextPage: false, endCursor: 'cursor' },
            totalCount: 2
          }
        }
      };
      
      client.query.mockResolvedValue(mockResponse);
      
      const result = await contractService.getContractsPaginated(10, null);
      
      expect(client.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { first: 10, after: null }
      });
      expect(result.contracts).toHaveLength(2);
      expect(result.contracts[0].businessNo).toBe('BC001');
      expect(result.pageInfo.hasNextPage).toBe(false);
      expect(result.totalCount).toBe(2);
    });

    it('should handle errors when fetching paginated contracts', async () => {
      const error = new Error('Network error');
      client.query.mockRejectedValue(error);
      
      await expect(contractService.getContractsPaginated(10, null)).rejects.toThrow('Network error');
    });
  });

  describe('getContractsByStatusPaginated', () => {
    it('should fetch paginated contracts by status successfully', async () => {
      const mockResponse = {
        data: {
          contractsByStatus: {
            edges: [
              { node: { id: '1', businessNo: 'BC001', status: 'PENDING' } }
            ],
            pageInfo: { hasNextPage: true, endCursor: 'cursor1' },
            totalCount: 1
          }
        }
      };
      
      client.query.mockResolvedValue(mockResponse);
      
      const result = await contractService.getContractsByStatusPaginated('PENDING', 5, null);
      
      expect(client.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { status: 'PENDING', first: 5, after: null }
      });
      expect(result.contracts).toHaveLength(1);
      expect(result.contracts[0].status).toBe('PENDING');
    });
  });

  describe('searchContractsPaginated', () => {
    it('should search paginated contracts successfully', async () => {
      const mockResponse = {
        data: {
          searchContracts: {
            edges: [
              { node: { id: '1', businessNo: 'BC001', theClient: 'Test Client' } }
            ],
            pageInfo: { hasNextPage: false, endCursor: 'cursor' },
            totalCount: 1
          }
        }
      };
      
      client.query.mockResolvedValue(mockResponse);
      
      const result = await contractService.searchContractsPaginated('Test', 10, null);
      
      expect(client.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { query: 'Test', first: 10, after: null }
      });
      expect(result.contracts).toHaveLength(1);
    });
  });

  describe('getAllContracts', () => {
    it('should fetch all contracts successfully', async () => {
      const mockResponse = {
        data: {
          contracts: [
            { id: '1', businessNo: 'BC001' },
            { id: '2', businessNo: 'BC002' }
          ]
        }
      };
      
      client.query.mockResolvedValue(mockResponse);
      
      const result = await contractService.getAllContracts();
      
      expect(client.query).toHaveBeenCalledWith({
        query: expect.any(Object)
      });
      expect(result).toHaveLength(2);
      expect(result[0].businessNo).toBe('BC001');
    });
  });

  describe('getContractsByStatus', () => {
    it('should fetch contracts by status successfully', async () => {
      const mockResponse = {
        data: {
          contractsByStatus: [
            { id: '1', businessNo: 'BC001', status: 'COMPLETED' }
          ]
        }
      };
      
      client.query.mockResolvedValue(mockResponse);
      
      const result = await contractService.getContractsByStatus('COMPLETED');
      
      expect(client.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { status: 'COMPLETED' }
      });
      expect(result).toHaveLength(1);
    });
  });

  describe('searchContracts', () => {
    it('should search contracts successfully', async () => {
      const mockResponse = {
        data: {
          searchContracts: {
            edges: [
              { node: { id: '1', businessNo: 'BC001', theClient: 'Search Term' } }
            ]
          }
        }
      };
      
      client.query.mockResolvedValue(mockResponse);
      
      const result = await contractService.searchContracts('Search Term');
      
      expect(client.query).toHaveBeenCalledWith({
        query: expect.any(Object),
        variables: { query: 'Search Term', first: 1000, after: null }
      });
      expect(result).toHaveLength(1);
      expect(result[0].businessNo).toBe('BC001');
    });
  });

  describe('createContract', () => {
    it('should create a contract successfully', async () => {
      const contractData = {
        businessNo: 'BC001',
        theClient: 'New Client',
        status: 'PENDING',
        receivables: [{ description: 'Invoice 1', amount: 1000 }],
        payables: [{ description: 'Expense 1', amount: 500 }]
      };
      
      const mockResponse = {
        data: {
          createContract: { id: 'new-1', ...contractData }
        }
      };
      
      client.mutate.mockResolvedValue(mockResponse);
      
      const result = await contractService.createContract(contractData);
      
      expect(client.mutate).toHaveBeenCalledWith({
        mutation: expect.any(Object),
        variables: {
          contractInput: contractData,
          receivableInputs: contractData.receivables,
          payableInputs: contractData.payables
        }
      });
      expect(result.id).toBe('new-1');
      expect(result.businessNo).toBe('BC001');
    });
  });

  describe('updateContract', () => {
    it('should update a contract successfully', async () => {
      const contractData = {
        businessNo: 'BC001-updated',
        theClient: 'Updated Client'
      };
      
      const mockResponse = {
        data: {
          updateContract: { id: '1', ...contractData }
        }
      };
      
      client.mutate.mockResolvedValue(mockResponse);
      
      const result = await contractService.updateContract('1', contractData);
      
      expect(client.mutate).toHaveBeenCalledWith({
        mutation: expect.any(Object),
        variables: {
          id: '1',
          input: contractData
        }
      });
      expect(result.id).toBe('1');
      expect(result.businessNo).toBe('BC001-updated');
    });
  });

  describe('deleteContract', () => {
    it('should delete a contract successfully', async () => {
      const mockResponse = {
        data: {
          deleteContract: { id: '1', businessNo: 'BC001', status: 'DELETED' }
        }
      };
      
      client.mutate.mockResolvedValue(mockResponse);
      
      const result = await contractService.deleteContract('1');
      
      expect(client.mutate).toHaveBeenCalledWith({
        mutation: expect.any(Object),
        variables: { id: '1' }
      });
      expect(result.id).toBe('1');
    });
  });
});