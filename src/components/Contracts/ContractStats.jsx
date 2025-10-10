import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { t } from '../../utils/i18n';
import StatsCard from '../ui/StatsCard';
import { CONTRACT_STATUSES } from '../../constants/contract';

const ContractStats = ({ allContractsStats = [] }) => {
  // 使用后端返回的合同状态数据
  const statsData = {
    total: allContractsStats.reduce((sum, stat) => sum + stat.count, 0),
    [CONTRACT_STATUSES[0]]: allContractsStats.find(stat => stat.status === CONTRACT_STATUSES[0])?.count || 0,
    [CONTRACT_STATUSES[1]]: allContractsStats.find(stat => stat.status === CONTRACT_STATUSES[1])?.count || 0,
    [CONTRACT_STATUSES[2]]: allContractsStats.find(stat => stat.status === CONTRACT_STATUSES[2])?.count || 0
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title={t('contracts.totalContracts')}
        value={statsData.total}
        icon={<FileText size={20} className="text-blue-600" />}
        trend="neutral"
      />
      
      <StatsCard
        title={t(`contractStatus.${CONTRACT_STATUSES[0]}`) }
        value={statsData[CONTRACT_STATUSES[0]]}
        icon={<Clock size={20} className="text-blue-500" />}
        trend="neutral"
      />
      
      <StatsCard
        title={t(`contractStatus.${CONTRACT_STATUSES[1]}`) }
        value={statsData[CONTRACT_STATUSES[1]]}
        icon={<Clock size={20} className="text-yellow-600" />}
        trend="neutral"
      />
      
      <StatsCard
        title={t(`contractStatus.${CONTRACT_STATUSES[2]}`) }
        value={statsData[CONTRACT_STATUSES[2]]}
        icon={<CheckCircle size={20} className="text-green-600" />}
        trend="up"
      />
    </div>
  );
};

export default ContractStats;