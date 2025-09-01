import React from 'react';
import { Users, User } from 'lucide-react';
import { t } from '../../utils/i18n';

const UserStats = ({ users }) => {
  const activeUsers = users.filter(user => user.status === 'ENABLED').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#e6f7ff', borderRadius: '0.5rem' }}>
            <Users size={20} style={{ color: '#1890ff' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('users.totalUsers')}</h3>
            <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('users.totalUsersDesc')}</p>
          </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1890ff' }}>
          {users.length}
        </h2>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#f6ffed', borderRadius: '0.5rem' }}>
            <User size={20} style={{ color: '#52c41a' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{t('users.activeUsers')}</h3>
            <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>{t('users.activeUsersDesc')}</p>
          </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#52c41a' }}>
          {activeUsers}
        </h2>
      </div>
    </div>
  );
};

export default UserStats;