// 角色相关的GraphQL变更

export const ROLE_MUTATIONS = {
  // 创建角色
  CREATE_ROLE: `
    mutation CreateRole(
      $name: String!
      $description: String
      $permissions: [String!]
    ) {
      createRole(
        name: $name
        description: $description
        permissions: $permissions
      ) {
        id
        name
        description
        permissions
        createdAt
      }
    }
  `,

  // 更新角色
  UPDATE_ROLE: `
    mutation UpdateRole(
      $id: ID!
      $name: String
      $description: String
      $permissions: [String!]
    ) {
      updateRole(
        id: $id
        name: $name
        description: $description
        permissions: $permissions
      ) {
        id
        name
        description
        permissions
        updatedAt
      }
    }
  `,

  // 删除角色
  DELETE_ROLE: `
    mutation DeleteRole($id: ID!) {
      deleteRole(id: $id)
    }
  `,

  // 分配角色给用户
  ASSIGN_ROLE_TO_USER: `
    mutation AssignRoleToUser($userId: ID!, $roleId: ID!) {
      assignRoleToUser(userId: $userId, roleId: $roleId) {
        id
        username
        email
        fullName
        roles {
          id
          name
          description
        }
      }
    }
  `,

  // 从用户移除角色
  REMOVE_ROLE_FROM_USER: `
    mutation RemoveRoleFromUser($userId: ID!, $roleId: ID!) {
      removeRoleFromUser(userId: $userId, roleId: $roleId) {
        id
        username
        email
        fullName
        roles {
          id
          name
          description
        }
      }
    }
  `
};