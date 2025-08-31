// GraphQL客户端配置
const API_BASE_URL = '/api';

// GraphQL查询构建器
class GraphQLClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async query(query, variables = {}) {
    try {
      const response = await fetch(`${this.baseURL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (error) {
      console.error('GraphQL request failed:', error);
      throw error;
    }
  }

  async mutation(mutation, variables = {}) {
    return this.query(mutation, variables);
  }
}

// 创建全局客户端实例
export const graphqlClient = new GraphQLClient(API_BASE_URL);