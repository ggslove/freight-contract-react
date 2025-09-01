import { gql } from '@apollo/client';
import client from '../apollo-client';

// 用户角色枚举
export const RoleEnum = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  OPERATOR: 'OPERATOR',
  VIEWER: 'VIEWER'
};

// 用户状态枚举
export const UserStatusEnum = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  LOCKED: 'LOCKED'
};

// 角色显示名称映射
export const RoleDisplayNames = {
  [RoleEnum.ADMIN]: '管理员',
  [RoleEnum.MANAGER]: '经理',
  [RoleEnum.OPERATOR]: '操作员',
  [RoleEnum.VIEWER]: '查看者'
};

// 状态显示名称映射
export const StatusDisplayNames = {
  [UserStatusEnum.ACTIVE]: '正常',
  [UserStatusEnum.INACTIVE]: '停用',
  [UserStatusEnum.LOCKED]: '锁定'
};

// 用户服务
const userService = {
  // 获取所有用户
  async getAllUsers() {
    try {
      const { data } = await client.query({
        query: gql`
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
        `
      });
      return data?.users || [];
    } catch (error) {
      console.error('获取用户列表失败:', error);
      return [];
    }
  },

  // 根据ID获取用户
  async getUserById(id) {
    try {
      const { data } = await client.query({
        query: gql`
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
        variables: { id }
      });
      return data?.user || null;
    } catch (error) {
      console.error('获取用户详情失败:', error);
      return null;
    }
  },

  // 根据用户名获取用户
  async getUserByUsername(username) {
    try {
      const { data } = await client.query({
        query: gql`
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
        variables: { username }
      });
      return data?.userByUsername || null;
    } catch (error) {
      console.error('根据用户名获取用户失败:', error);
      return null;
    }
  },

  // 创建用户
  async createUser(userData) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation CreateUser($user: UserInput!) {
            createUser(user: $user) {
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
        variables: { user: userData }
      });
      return data?.createUser || null;
    } catch (error) {
      console.error('创建用户失败:', error);
      return null;
    }
  },

  // 更新用户
  async updateUser(id, userData) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation UpdateUser($id: ID!, $user: UserInput!) {
            updateUser(id: $id, user: $user) {
              id
              username
              email
              realName
              phone
              role
              status
              updatedAt
            }
          }
        `,
        variables: { id, user: userData }
      });
      return data?.updateUser || null;
    } catch (error) {
      console.error('更新用户失败:', error);
      return null;
    }
  },

  // 删除用户
  async deleteUser(id) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id)
          }
        `,
        variables: { id }
      });
      return data?.deleteUser || false;
    } catch (error) {
      console.error('删除用户失败:', error);
      return false;
    }
  },

  // 更新用户状态
  async updateUserStatus(id, status) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation UpdateUserStatus($id: ID!, $status: String!) {
            updateUserStatus(id: $id, status: $status) {
              id
              status
              updatedAt
            }
          }
        `,
        variables: { id, status }
      });
      return data?.updateUserStatus || null;
    } catch (error) {
      console.error('更新用户状态失败:', error);
      return null;
    }
  },

  // 重置用户密码
  async resetUserPassword(id, newPassword) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation ResetUserPassword($id: ID!, $newPassword: String!) {
            resetUserPassword(id: $id, newPassword: $newPassword) {
              id
              updatedAt
            }
          }
        `,
        variables: { id, newPassword }
      });
      return data?.resetUserPassword || null;
    } catch (error) {
      console.error('重置用户密码失败:', error);
      return null;
    }
  },

  // 获取用户统计信息
  async getUserStatistics() {
    try {
      const users = await this.getAllUsers();
      const totalUsers = users.length;
      const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
      const inactiveUsers = users.filter(u => u.status === 'INACTIVE').length;
      const lockedUsers = users.filter(u => u.status === 'LOCKED').length;
      
      const roleStats = {};
      users.forEach(user => {
        roleStats[user.role] = (roleStats[user.role] || 0) + 1;
      });

      return {
        totalUsers,
        activeUsers,
        inactiveUsers,
        lockedUsers,
        roleStats
      };
    } catch (error) {
      console.error('获取用户统计信息失败:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        lockedUsers: 0,
        roleStats: {}
      };
    }
  }
};

export default userService;