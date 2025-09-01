import client from '../apollo-client';
import { gql } from '@apollo/client/core';
import { USER_QUERIES } from '../graphql/queries/user.queries.js';
import { USER_MUTATIONS } from '../graphql/mutations/user.mutations.js';

// 从现有查询和变更中提取
const {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  SEARCH_USERS,
  GET_USERS_BY_STATUS,
  GET_CURRENT_USER
} = USER_QUERIES;

const {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  RESET_PASSWORD,
  CHANGE_PASSWORD
} = USER_MUTATIONS;

// 角色枚举映射
export const RoleEnum = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  BUSINESS_MANAGER: 'BUSINESS_MANAGER',
  FINANCE_STAFF: 'FINANCE_STAFF',
  NORMAL_USER: 'NORMAL_USER'
};

// 用户状态枚举映射
export const UserStatusEnum = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED'
};

// 角色显示名称映射
export const RoleDisplayNames = {
  SUPER_ADMIN: '超级管理员',
  SYSTEM_ADMIN: '系统管理员',
  BUSINESS_MANAGER: '业务经理',
  FINANCE_STAFF: '财务人员',
  NORMAL_USER: '普通用户'
};

// 状态显示名称映射
export const StatusDisplayNames = {
  ENABLED: '启用',
  DISABLED: '禁用'
};

const userService = {
  // 获取所有用户
  async getAllUsers() {
    const { data } = await client.query({
      query: gql(GET_ALL_USERS),
      fetchPolicy: 'network-only'
    });
    return data.users;
  },

  // 根据ID获取用户
  async getUserById(id) {
    const { data } = await client.query({
      query: gql(GET_USER_BY_ID),
      variables: { id },
      fetchPolicy: 'network-only'
    });
    return data.user;
  },

  // 创建用户
  async createUser(userData) {
    const { data } = await client.mutate({
      mutation: gql(CREATE_USER),
      variables: userData
    });
    return data.createUser;
  },

  // 更新用户
  async updateUser(id, userData) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_USER),
      variables: { id, ...userData }
    });
    return data.updateUser;
  },

  // 删除用户
  async deleteUser(id) {
    const { data } = await client.mutate({
      mutation: gql(DELETE_USER),
      variables: { id }
    });
    return data.deleteUser;
  },

  // 搜索用户
  async searchUsers(keyword) {
    const { data } = await client.query({
      query: gql(SEARCH_USERS),
      variables: { keyword },
      fetchPolicy: 'network-only'
    });
    return data.searchUsers;
  },

  // 根据状态获取用户
  async getUsersByStatus(status) {
    const { data } = await client.query({
      query: gql(GET_USERS_BY_STATUS),
      variables: { status },
      fetchPolicy: 'network-only'
    });
    return data.usersByStatus;
  },

  // 获取当前用户信息
  async getCurrentUser() {
    const { data } = await client.query({
      query: gql(GET_CURRENT_USER),
      fetchPolicy: 'network-only'
    });
    return data.currentUser;
  },

  // 重置用户密码
  async resetPassword(id, newPassword) {
    const { data } = await client.mutate({
      mutation: gql(RESET_PASSWORD),
      variables: { id, newPassword }
    });
    return data.resetPassword;
  },

  // 修改密码
  async changePassword(oldPassword, newPassword) {
    const { data } = await client.mutate({
      mutation: gql(CHANGE_PASSWORD),
      variables: { oldPassword, newPassword }
    });
    return data.changePassword;
  },

  // 切换用户状态（兼容方法）
  async toggleUserStatus(id, status) {
    return this.updateUser(id, { status });
  }
};

export default userService;