import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
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
  btnDisabled,
  statusTag
} from '../../styles/tableStyles';

const RoleTable = ({ roles, onEdit, onDelete }) => {
  return (
    <div style={tableContainer}>
      <table style={tableBase}>
        <thead>
          <tr style={trHeader}>
            <th style={thBase}>{t('system.roleName')}</th>
            <th style={thBase}>{t('system.roleDescription')}</th>
            <th style={thBase}>{t('system.permissions')}</th>
            <th style={thBase}>{t('system.userCount')}</th>
            <th style={thBase}>{t('common.type')}</th>
            <th style={thBase}>{t('system.createTime')}</th>
            <th style={thBase}>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={role.id} style={trStriped(index)}>
              <td style={{...tdBase, fontWeight: '500'}}>{role.name}</td>
              <td style={{...tdBase, color: '#666', maxWidth: '200px'}}>{role.description}</td>
              <td style={tdBase}>
                <span style={statusTag('success')}>
                  {role.permissions.length} 项
                </span>
              </td>
              <td style={tdBase}>
                <span style={statusTag('success')}>
                  {role.userCount} 人
                </span>
              </td>
              <td style={tdBase}>
                <span style={statusTag(role.isSystem ? 'warning' : 'active')}>
                  {role.isSystem ? t('system.systemRoles') : t('system.customRoles')}
                </span>
              </td>
              <td style={{...tdBase, fontSize: '0.875rem', color: '#666'}}>
                {new Date(role.createTime).toLocaleString('zh-CN')}
              </td>
              <td style={tdBase}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEdit(role)}
                    disabled={role.isSystem}
                    style={{
                      ...btnBase,
                      ...(role.isSystem ? btnDisabled : btnPrimary),
                      padding: '0.375rem 0.75rem'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(role.id)}
                    disabled={role.isSystem || role.userCount > 0}
                    style={{
                      ...btnBase,
                      ...((role.isSystem || role.userCount > 0) ? btnDisabled : btnDanger),
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

export default RoleTable;