import React from 'react';
import { Users, User } from 'lucide-react';
import { t } from '../../utils/i18n';
import StatsCard from '../Common/StatsCard';

const UserStats = ({ users }) => {
  const activeUsers = users.filter(user => user.status === 'ENABLED').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <StatsCard
        title={t('users.totalUsers')}
        value={users.length}
        description={t('users.totalUsersDesc')}
        icon={<Users size={20} />}
        color="#1890ff"
        bgColor="#e6f7ff"
      />
      
      <StatsCard
        title={t('users.activeUsers')}
        value={activeUsers}
        description={t('users.activeUsersDesc')}
        icon={<User size={20} />}
        color="#52c41a"
        bgColor="#f6ffed"
      />
    </div>
  );
};

export default UserStats;