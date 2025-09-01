// 用户相关的GraphQL变更

export const USER_MUTATIONS = {
  // 创建用户
  CREATE_USER: `
    mutation CreateUser(
      $username: String!
      $email: String!
      $fullName: String!
      $password: String!
      $phone: String
      $status: UserStatus!
      $roleIds: [ID!]
    ) {
      createUser(
        username: $username
        email: $email
        fullName: $fullName
        password: $password
        phone: $phone
        status: $status
        roleIds: $roleIds
      ) {
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
          description
        }
      }
    }
  `,

  // 更新用户
  UPDATE_USER: `
    mutation UpdateUser(
      $id: ID!
      $username: String
      $email: String
      $fullName: String
      $phone: String
      $status: UserStatus
      $roleIds: [ID!]
    ) {
      updateUser(
        id: $id
        username: $username
        email: $email
        fullName: $fullName
        phone: $phone
        status: $status
        roleIds: $roleIds
      ) {
        id
        username
        email
        fullName
        phone
        status
        updatedAt
        roles {
          id
          name
          description
        }
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
      }
    }
  `
};