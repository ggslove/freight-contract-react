// 用户相关的GraphQL变更 - 与后端schema完全匹配

export const USER_MUTATIONS = {
  // 创建用户
  CREATE_USER: `
    mutation CreateUser(
      $username: String!
      $realName: String
      $email: String!
      $phone: String
      $password: String!
      $role: Role!
      $status: UserStatus!
    ) {
      createUser(
        username: $username
        realName: $realName
        email: $email
        phone: $phone
        password: $password
        role: $role
        status: $status
      ) {
        id
        username
        realName
        email
        phone
        role
        status
        lastLogin
        createdAt
        updatedAt
      }
    }
  `,

  // 更新用户
  UPDATE_USER: `
    mutation UpdateUser(
      $id: ID!
      $username: String
      $realName: String
      $email: String
      $phone: String
      $password: String
    ) {
      updateUser(
        id: $id
        username: $username
        realName: $realName
        email: $email
        phone: $phone
        password: $password
      ) {
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

  // 删除用户
  DELETE_USER: `
    mutation DeleteUser($id: ID!) {
      deleteUser(id: $id)
    }
  `,

  // 重置用户密码
  RESET_PASSWORD: `
    mutation ResetPassword($id: ID!, $newPassword: String!) {
      resetPassword(id: $id, newPassword: $newPassword) {
        id
        username
        email
        realName
      }
    }
  `,

  // 修改密码
  CHANGE_PASSWORD: `
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
      changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
        id
        username
        email
        realName
      }
    }
  `
  ,
  UPDATE_USER_STATUS: `
    mutation UpdateUserStatus($id: ID!, $status: UserStatus!) {
      updateUserStatus(id: $id, status: $status) {
        id
        username
        realName
        email
        phone
        role
        status
        lastLogin
        createdAt
        updatedAt
      }
    }
  `
};