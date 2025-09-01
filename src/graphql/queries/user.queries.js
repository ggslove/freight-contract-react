// 用户相关的GraphQL查询

export const USER_QUERIES = {
  // 获取所有用户
  GET_ALL_USERS: `
    query GetAllUsers {
      users {
        id
        username
        email
        realName
        phone
        role
        status
        createdAt
        updatedAt
        lastLogin
      }
    }
  `,

  // 根据ID获取用户
  GET_USER_BY_ID: `
    query GetUserById($id: ID!) {
      user(id: $id) {
        id
        username
        email
        realName
        phone
        role
        status
        createdAt
        updatedAt
        lastLogin
      }
    }
  `,

  // 根据用户名获取用户
  GET_USER_BY_USERNAME: `
    query GetUserByUsername($username: String!) {
      userByUsername(username: $username) {
        id
        username
        email
        realName
        phone
        role
        status
        createdAt
      }
    }
  `,

  // 获取当前用户信息 - 需要身份验证
  GET_CURRENT_USER: `
    query GetCurrentUser {
      user(id: 1) {
        id
        username
        email
        realName
        phone
        role
        status
        createdAt
      }
    }
  `
};