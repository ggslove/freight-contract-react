import client from '../apollo-client';
import { gql } from '@apollo/client/core';
import { USER_QUERIES } from '../graphql/queries/user.queries.js';
import { USER_MUTATIONS } from '../graphql/mutations/user.mutations.js';

const { GET_ALL_USERS, GET_USER_BY_ID, GET_USER_BY_USERNAME, GET_CURRENT_USER, SEARCH_USERS } = USER_QUERIES;
const { CREATE_USER, UPDATE_USER, DELETE_USER, UPDATE_USER_STATUS } = USER_MUTATIONS
// 获取所有用户

const userService = {
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
  // 根据用户名获取用户
  async getUserByUsername(username) {
    const { data } = await client.query({
      query: gql(GET_USER_BY_USERNAME),
      variables: { username },
      fetchPolicy: 'network-only'
    });
    return data?.userByUsername || null;
  },

  // 获取当前登录用户
  async getCurrentUser() {
    const { data } = await client.query({
      query: gql(GET_CURRENT_USER),
      fetchPolicy: 'network-only'
    });
    return data?.currentUser || null;
  },

  // 创建用户
  async createUser(userData) {
    // 构建变量
    const variables = {
      username: userData.username,
      realName: userData.realName,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      status: userData.status || 'ENABLED',
      password: userData.password
    };
    const { data } = await client.mutate({
      mutation: gql(CREATE_USER),
      variables,
    });

    return data.createUser;
  },

  // 更新用户
  async updateUser(id, userData) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_USER),
      variables:{ id, ...userData }
    });
    return data.updateUser;
  },


  // 删除用户
  async deleteUser(id) {
    const { data } = await client.mutate({
      mutation: gql(DELETE_USER),
      variables: { id },
    });
    return data?.deleteUser || false;
  },

  // 更新用户状态
  async updateUserStatus(id, status) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_USER_STATUS),
      variables: { id, status },
    });
    return data?.updateUserStatus || null;
  },

  // 搜索用户
  async searchUsers(keyword) {
    const { data } = await client.query({
      query: gql(SEARCH_USERS),
      variables: { keyword },
      fetchPolicy: 'network-only'
    });
    return data?.searchUsers || [];
  }

}

export default userService;