import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { t } from '../../utils/i18n';

const RoleTable = ({ roles, onEdit, onDelete }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.roleName')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.roleDescription')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.permissions')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.userCount')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('common.type')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('system.createTime')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '1rem', fontWeight: '500' }}>{role.name}</td>
              <td style={{ padding: '1rem', color: '#666', maxWidth: '200px' }}>{role.description}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#f0f9ff',
                  color: '#1890ff',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  {role.permissions.length} 项
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#f6ffed',
                  color: '#52c41a',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  {role.userCount} 人
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: role.isSystem ? '#fff7e6' : '#e6f7ff',
                  color: role.isSystem ? '#faad14' : '#1890ff',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  {role.isSystem ? t('system.systemRoles') : t('system.customRoles')}
                </span>
              </td>
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>
                {new Date(role.createTime).toLocaleString('zh-CN')}
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEdit(role)}
                    disabled={role.isSystem}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: role.isSystem ? '#d9d9d9' : '#1890ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: role.isSystem ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => !role.isSystem && (e.target.style.backgroundColor = '#096dd9')}
                    onMouseLeave={(e) => !role.isSystem && (e.target.style.backgroundColor = '#1890ff')}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(role.id)}
                    disabled={role.isSystem || role.userCount > 0}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: (role.isSystem || role.userCount > 0) ? '#d9d9d9' : '#ff4d4f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: (role.isSystem || role.userCount > 0) ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => !(role.isSystem || role.userCount > 0) && (e.target.style.backgroundColor = '#ff7875')}
                    onMouseLeave={(e) => !(role.isSystem || role.userCount > 0) && (e.target.style.backgroundColor = '#ff4d4f')}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;