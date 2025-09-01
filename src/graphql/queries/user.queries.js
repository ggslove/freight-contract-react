// 用户相关的GraphQL查询

export const USER_QUERIES = {
  // 获取所有用户
  GET_ALL_USERS: `
    query GetAllUsers {
      users {
        id
        username
        email
        fullName
        phone
        status
        createdAt
        updatedAt
        roles {
          id
          name
          description
        }
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
        fullName
        phone
        status
        createdAt
        updatedAt
        roles {
          id
          name
          description
          permissions
        }
      }
    }
  `,

  // 搜索用户
  SEARCH_USERS: `
    query SearchUsers($keyword: String!) {
      searchUsers(keyword: $keyword) {
        id
        username
        email
        fullName
        phone
        status
        createdAt
        roles {
          id
          name
        }
      }
    }
  `,

  // 根据状态获取用户
  GET_USERS_BY_STATUS: `
    query GetUsersByStatus($status: UserStatus!) {
      usersByStatus(status: $status) {
        id
        username
        email
        fullName
        phone
        status
        createdAt
        roles {
          id
          name
        }
      }
    }
  `,

  // 获取当前用户信息
  GET_CURRENT_USER: `
    query GetCurrentUser {
      currentUser {
        id
        username
        email
        fullName
        phone
        status
        roles {
          id
          name
          description
          permissions
        }
      }
    }
  `
};