// 用户相关的GraphQL查询 - 与后端schema完全匹配

export const USER_QUERIES = {
  // 获取所有用户
  GET_ALL_USERS: `
    query GetAllUsers {
      users {
        id
        username
        realName
        email
        phone
        lastLogin
        createdAt
        updatedAt
      }
    }
  `,

  // 根据ID获取用户
  GET_USER_BY_ID: `
    query GetUserById($id: ID!) {
      user(id: $id) {
        id
        username
        realName
        email
        phone
        lastLogin
        createdAt
        updatedAt
      }
    }
  `,

  // 根据用户名获取用户
  GET_USER_BY_USERNAME: `
    query GetUserByUsername($username: String!) {
      userByUsername(username: $username) {
        id
        username
        realName
        email
        phone
        lastLogin
        createdAt
        updatedAt
      }
    }
  `,

  // 获取当前用户信息
  GET_CURRENT_USER: `
    query GetCurrentUser {
      user(id: 1) {
        id
        username
        realName
        email
        phone
        lastLogin
        createdAt
        updatedAt
      }
    }
  `
};