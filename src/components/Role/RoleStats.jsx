import React from 'react';
import { Shield } from 'lucide-react';
import { t } from '../../utils/i18n';

const RoleStats = ({ roles }) => {
  const systemRoles = roles.filter(role => role.isSystem).length;
  const customRoles = roles.filter(role => !role.isSystem).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#e6f7ff', borderRadius: '0.5rem' }}>
            <Shield size={20} style={{ color: '#1890ff' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('system.totalRoles')}</h3>
            <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('system.totalRolesDesc')}</p>
          </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1890ff' }}>
          {roles.length}
        </h2>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#fff7e6', borderRadius: '0.5rem' }}>
            <Shield size={20} style={{ color: '#faad14' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('system.systemRoles')}</h3>
            <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('system.systemRolesDesc')}</p>
          </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#faad14' }}>
          {systemRoles}
        </h2>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#f6ffed', borderRadius: '0.5rem' }}>
            <Shield size={20} style={{ color: '#52c41a' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('system.customRoles')}</h3>
            <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('system.customRolesDesc')}</p>
          </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>
          {customRoles}
        </h2>
      </div>
    </div>
  );
};

export default RoleStats;