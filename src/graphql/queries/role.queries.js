// 角色相关的GraphQL查询
// 注意：后端目前没有独立的角色查询，角色是用户的一个字段

export const ROLE_QUERIES = {
  // 获取所有用户 - 通过用户列表推断角色
  GET_ALL_USERS: `
    query GetAllUsers {
      users {
        id
        username
        email
        realName
        role
        status
        createdAt
      }
    }
  `,

  // 获取特定角色的用户
  GET_USERS_BY_ROLE: `
    query GetUsersByRole($role: String!) {
      users {
        id
        username
        email
        realName
        role
        status
        createdAt
      }
    }
  `,

  // 获取角色统计信息 - 通过用户聚合
  GET_ROLE_STATISTICS: `
    query GetRoleStatistics {
      users {
        role
      }
    }
  `
};