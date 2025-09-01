// 角色相关的GraphQL查询

export const ROLE_QUERIES = {
  // 获取所有角色
  GET_ALL_ROLES: `
    query GetAllRoles {
      roles {
        id
        name
        description
        permissions
        createdAt
        updatedAt
        userCount
      }
    }
  `,

  // 根据ID获取角色
  GET_ROLE_BY_ID: `
    query GetRoleById($id: ID!) {
      role(id: $id) {
        id
        name
        description
        permissions
        createdAt
        updatedAt
        users {
          id
          username
          email
          fullName
        }
      }
    }
  `,

  // 搜索角色
  SEARCH_ROLES: `
    query SearchRoles($keyword: String!) {
      searchRoles(keyword: $keyword) {
        id
        name
        description
        permissions
        createdAt
        userCount
      }
    }
  `,

  // 获取所有权限
  GET_ALL_PERMISSIONS: `
    query GetAllPermissions {
      permissions {
        key
        name
        description
        module
      }
    }
  `,

  // 获取角色权限
  GET_ROLE_PERMISSIONS: `
    query GetRolePermissions($roleId: ID!) {
      rolePermissions(roleId: $roleId) {
        key
        name
        description
        module
      }
    }
  `
};