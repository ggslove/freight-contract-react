import React from 'react';
import { Edit, Trash2, Shield, User } from 'lucide-react';
import { t } from '../../utils/i18n';
import {
  tableContainer,
  tableBase,
  trHeader,
  trStriped,
  thBase,
  tdBase,
  btnBase,
  btnPrimary,
  btnDanger,
  statusTag
} from '../../styles/tableStyles';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div style={tableContainer}>
      <table style={tableBase}>
        <thead>
          <tr style={trHeader}>
            <th style={thBase}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} />
                {t('user.username')}
              </div>
            </th>
            <th style={thBase}>{t('user.email')}</th>
            <th style={thBase}>{t('user.phone')}</th>
            <th style={thBase}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={16} />
                {t('user.role')}
              </div>
            </th>
            <th style={thBase}>{t('user.status')}</th>
            <th style={thBase}>{t('user.createTime')}</th>
            <th style={thBase}>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} style={trStriped(index)}>
              <td style={{...tdBase, fontWeight: '500'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#1890ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {user.username?.charAt(0)?.toUpperCase()}
                  </div>
                  {user.username}
                </div>
              </td>
              <td style={{...tdBase, color: '#666'}}>{user.email}</td>
              <td style={{...tdBase, color: '#666'}}>{user.phone || '-'}</td>
              <td style={tdBase}>
                <span style={statusTag('active')}>
                  {user.roleName}
                </span>
              </td>
              <td style={tdBase}>
                <span style={statusTag(user.status === 1 ? 'success' : 'warning')}>
                  {user.status === 1 ? t('user.active') : t('user.inactive')}
                </span>
              </td>
              <td style={{...tdBase, fontSize: '0.875rem', color: '#666'}}>
                {new Date(user.createTime).toLocaleString('zh-CN')}
              </td>
              <td style={tdBase}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEdit(user)}
                    style={{
                      ...btnBase,
                      ...btnPrimary,
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    style={{
                      ...btnBase,
                      ...btnDanger,
                      padding: '0.375rem 0.75rem'
                    }}
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