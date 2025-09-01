import client from '../apollo-client';
import { gql } from '@apollo/client/core';
import { ROLE_QUERIES } from '../graphql/queries/role.queries.js';
import { ROLE_MUTATIONS } from '../graphql/mutations/role.mutations.js';

// 从现有查询和变更中提取
const {
  GET_ALL_ROLES,
  GET_ROLE_BY_ID,
  SEARCH_ROLES,
  GET_ALL_PERMISSIONS,
  GET_ROLE_PERMISSIONS
} = ROLE_QUERIES;

const {
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  ASSIGN_ROLE_TO_USER,
  REMOVE_ROLE_FROM_USER
} = ROLE_MUTATIONS;

// 角色枚举映射
export const RoleEnum = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  BUSINESS_MANAGER: 'BUSINESS_MANAGER',
  FINANCE_STAFF: 'FINANCE_STAFF',
  NORMAL_USER: 'NORMAL_USER'
};

// 角色显示名称映射
export const RoleDisplayNames = {
  SUPER_ADMIN: '超级管理员',
  SYSTEM_ADMIN: '系统管理员',
  BUSINESS_MANAGER: '业务经理',
  FINANCE_STAFF: '财务人员',
  NORMAL_USER: '普通用户'
};

// 权限模块分类
export const PermissionModules = {
  SYSTEM: '系统管理',
  USER: '用户管理',
  ROLE: '角色管理',
  CONTRACT: '合同管理',
  FINANCE: '财务管理',
  REPORT: '报表管理'
};

const roleService = {
  // 获取所有角色
  async getAllRoles() {
    const { data } = await client.query({
      query: gql(GET_ALL_ROLES),
      fetchPolicy: 'network-only'
    });
    return data.roles;
  },

  // 根据ID获取角色
  async getRoleById(id) {
    const { data } = await client.query({
      query: gql(GET_ROLE_BY_ID),
      variables: { id },
      fetchPolicy: 'network-only'
    });
    return data.role;
  },

  // 创建角色
  async createRole(roleData) {
    const { data } = await client.mutate({
      mutation: gql(CREATE_ROLE),
      variables: roleData
    });
    return data.createRole;
  },

  // 更新角色
  async updateRole(id, roleData) {
    const { data } = await client.mutate({
      mutation: gql(UPDATE_ROLE),
      variables: { id, ...roleData }
    });
    return data.updateRole;
  },

  // 删除角色
  async deleteRole(id) {
    const { data } = await client.mutate({
      mutation: gql(DELETE_ROLE),
      variables: { id }
    });
    return data.deleteRole;
  },

  // 搜索角色
  async searchRoles(keyword) {
    const { data } = await client.query({
      query: gql(SEARCH_ROLES),
      variables: { keyword },
      fetchPolicy: 'network-only'
    });
    return data.searchRoles;
  },

  // 获取所有权限
  async getAllPermissions() {
    const { data } = await client.query({
      query: gql(GET_ALL_PERMISSIONS),
      fetchPolicy: 'network-only'
    });
    return data.permissions;
  },

  // 获取角色权限
  async getRolePermissions(roleId) {
    const { data } = await client.query({
      query: gql(GET_ROLE_PERMISSIONS),
      variables: { roleId },
      fetchPolicy: 'network-only'
    });
    return data.rolePermissions;
  },

  // 分配角色给用户
  async assignRoleToUser(userId, roleId) {
    const { data } = await client.mutate({
      mutation: gql(ASSIGN_ROLE_TO_USER),
      variables: { userId, roleId }
    });
    return data.assignRoleToUser;
  },

  // 从用户移除角色
  async removeRoleFromUser(userId, roleId) {
    const { data } = await client.mutate({
      mutation: gql(REMOVE_ROLE_FROM_USER),
      variables: { userId, roleId }
    });
    return data.removeRoleFromUser;
  }
};

export default roleService;