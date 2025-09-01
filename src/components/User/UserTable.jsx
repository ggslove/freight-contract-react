import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { t } from '../../utils/i18n';

const UserTable = ({ users, onEdit, onDelete, onToggleStatus, getRoleDisplayName, getStatusDisplayName, formatDate }) => {
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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.username')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.realName')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.email')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.phone')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.role')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.status')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.createdAt')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('users.lastLogin')}</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '1rem' }}>{user.username}</td>
              <td style={{ padding: '1rem' }}>{user.realName || '-'}</td>
              <td style={{ padding: '1rem' }}>{user.email}</td>
              <td style={{ padding: '1rem' }}>{user.phone || '-'}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#e6f7ff',
                  color: '#1890ff',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  {getRoleDisplayName(user.role)}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <button
                  onClick={() => onToggleStatus(user.id)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    backgroundColor: user.status === 'ENABLED' ? '#52c41a' : '#ff4d4f',
                    color: 'white'
                  }}
                >
                  {getStatusDisplayName(user.status)}
                </button>
              </td>
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{formatDate(user.createdAt)}</td>
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#666' }}>{formatDate(user.lastLogin)}</td>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEdit(user)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: '#1890ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#096dd9'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: '#ff4d4f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#ff7875'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4d4f'}
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

export default UserTable;