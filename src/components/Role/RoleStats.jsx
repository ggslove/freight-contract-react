import React from 'react';
import { Shield } from 'lucide-react';
import { t } from '../../utils/i18n';
import StatsCard from '../ui/StatsCard';

const RoleStats = ({ roles }) => {
  const systemRoles = roles.filter(role => role.isSystem).length;
  const customRoles = roles.filter(role => !role.isSystem).length;
  const activeRoles = roles.filter(role => role.isActive).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <StatsCard
        title={t('system.totalRoles')}
        value={roles.length}
        description={t('system.totalRolesDesc')}
        icon={<Shield size={20} />}
        color="#1890ff"
        bgColor="#e6f7ff"
      />
      
      <StatsCard
        title={t('system.systemRoles')}
        value={systemRoles}
        description={t('system.systemRolesDesc')}
        icon={<Shield size={20} />}
        color="#faad14"
        bgColor="#fff7e6"
      />
      
      <StatsCard
        title={t('system.customRoles')}
        value={customRoles}
        description={t('system.customRolesDesc')}
        icon={<Shield size={20} />}
        color="#52c41a"
        bgColor="#f6ffed"
      />

      <StatsCard
        title={t('system.activeRoles')}
        value={activeRoles}
        description={t('system.activeRolesDesc')}
        icon={<Shield size={20} />}
        color="#0ea5e9"
        bgColor="#f0f9ff"
      />
    </div>
  );
};

export default RoleStats;