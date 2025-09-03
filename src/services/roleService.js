import { gql } from '@apollo/client';
import client from '../apollo-client';

// 角色枚举
export const RoleEnum = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  OPERATOR: 'OPERATOR',
  VIEWER: 'VIEWER'
};

// 角色显示名称映射
export const RoleDisplayNames = {
  [RoleEnum.ADMIN]: '管理员',
  [RoleEnum.MANAGER]: '经理',
  [RoleEnum.OPERATOR]: '操作员',
  [RoleEnum.VIEWER]: '查看者'
};

// 角色描述
export const RoleDescriptions = {
  [RoleEnum.ADMIN]: '拥有系统所有权限的管理员',
  [RoleEnum.MANAGER]: '负责业务管理的经理',
  [RoleEnum.OPERATOR]: '日常操作的操作员',
  [RoleEnum.VIEWER]: '只能查看数据的查看者'
};

// 角色权限映射
export const RolePermissions = {
  [RoleEnum.ADMIN]: ['*'], // 所有权限
  [RoleEnum.MANAGER]: [
    'user:read', 'user:write',
    'contract:read', 'contract:write',
    'report:read', 'report:write'
  ],
  [RoleEnum.OPERATOR]: [
    'user:read',
    'contract:read', 'contract:write',
    'report:read'
  ],
  [RoleEnum.VIEWER]: [
    'user:read',
    'contract:read',
    'report:read'
  ]
};

// 角色服务
const roleService = {
  // 获取所有角色（基于用户数据推断）
  async getAllRoles() {
    try {
      const response = await client.query({
        query: gql`
          query GetAllUsersForRoles {
            users {
              id
              username
              realName
              email
              role
              status
              lastLogin
              createdAt
              updatedAt
            }
          }
        `,
        errorPolicy: 'all'
      });

      const users = response.data?.users || [];
      
      // 从用户数据中统计角色使用情况
      const roleStats = {};
      users.forEach(user => {
        if (user.role) {
          roleStats[user.role] = (roleStats[user.role] || 0) + 1;
        }
      });

      // 构建角色列表
      const roles = Object.values(RoleEnum).map(role => ({
        id: role,
        name: role,
        displayName: RoleDisplayNames[role] || role,
        description: RoleDescriptions[role] || '',
        permissions: RolePermissions[role] || [],
        userCount: roleStats[role] || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      return roles;
    } catch (error) {
      console.error('获取角色列表失败:', error);
      return [];
    }
  },

  // 获取角色详情
  async getRoleById(id) {
    try {
      const roles = await this.getAllRoles();
      return roles.find(role => role.id === id) || null;
    } catch (error) {
      console.error('获取角色详情失败:', error);
      return null;
    }
  },

  // 获取角色下的用户
  async getUsersByRole(role) {
    try {
      const response = await client.query({
        query: gql`
          query GetUsersByRole($role: String!) {
            users {
              id
              username
              realName
              email
              role
              status
              lastLogin
              createdAt
              updatedAt
            }
          }
        `,
        variables: { role },
        errorPolicy: 'all'
      });

      const users = response.data?.users || [];
      return users.filter(user => user.role === role);
    } catch (error) {
      console.error('获取角色用户失败:', error);
      return [];
    }
  },

  // 获取角色统计信息
  async getRoleStatistics() {
    try {
      const response = await client.query({
        query: gql`
          query GetRoleStatistics {
            users {
              id
              role
            }
          }
        `,
        errorPolicy: 'all'
      });

      const users = response.data?.users || [];
      
      const roleStats = {};
      users.forEach(user => {
        if (user.role) {
          roleStats[user.role] = (roleStats[user.role] || 0) + 1;
        }
      });

      const totalUsers = users.length;
      const totalRoles = Object.keys(roleStats).length;

      return {
        totalUsers,
        totalRoles,
        roleStats,
        roles: Object.entries(roleStats).map(([role, count]) => ({
          role,
          displayName: RoleDisplayNames[role] || role,
          count,
          percentage: totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0
        }))
      };
    } catch (error) {
      console.error('获取角色统计信息失败:', error);
      return {
        totalUsers: 0,
        totalRoles: 0,
        roleStats: {},
        roles: []
      };
    }
  },

  // 创建角色（模拟）
  async createRole(roleData) {
    try {
      // 由于后端没有独立的角色管理，这里模拟创建角色
      const newRole = {
        id: roleData.name,
        name: roleData.name,
        displayName: roleData.displayName || RoleDisplayNames[roleData.name] || roleData.name,
        description: roleData.description || '',
        permissions: roleData.permissions || [],
        userCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return newRole;
    } catch (error) {
      console.error('创建角色失败:', error);
      return null;
    }
  },

  // 更新角色（模拟）
  async updateRole(id, roleData) {
    try {
      const role = await this.getRoleById(id);
      if (!role) return null;

      return {
        ...role,
        ...roleData,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('更新角色失败:', error);
      return null;
    }
  },

  // 删除角色（模拟）
  async deleteRole(id) {
    try {
      // 检查是否有用户在使用该角色
      const users = await this.getUsersByRole(id);
      if (users.length > 0) {
        throw new Error('该角色正在被用户使用，无法删除');
      }
      return true;
    } catch (error) {
      console.error('删除角色失败:', error);
      return false;
    }
  },

  // 搜索角色
  async searchRoles(keyword) {
    try {
      const roles = await this.getAllRoles();
      if (!keyword) return roles;

      const searchTerm = keyword.toLowerCase();
      return roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm) ||
        role.displayName.toLowerCase().includes(searchTerm) ||
        role.description.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('搜索角色失败:', error);
      return [];
    }
  },

  // 获取权限列表
  async getAllPermissions() {
    try {
      return [
        { key: 'user:read', name: '查看用户', description: '查看用户列表和详情' },
        { key: 'user:write', name: '管理用户', description: '创建、更新、删除用户' },
        { key: 'contract:read', name: '查看合同', description: '查看合同列表和详情' },
        { key: 'contract:write', name: '管理合同', description: '创建、更新、删除合同' },
        { key: 'report:read', name: '查看报表', description: '查看各种报表数据' },
        { key: 'report:write', name: '管理报表', description: '创建、更新、删除报表' }
      ];
    } catch (error) {
      console.error('获取权限列表失败:', error);
      return [];
    }
  }
};

export default roleService;