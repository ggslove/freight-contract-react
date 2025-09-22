import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { t } from '../../utils/i18n';
import StatsCard from '../ui/StatsCard';

const ContractStats = ({ contracts }) => {
  // 计算统计数据
  const totalContracts = contracts.length;
  const draftContracts = contracts.filter(c => c.status === 'draft').length;
  const pendingContracts = contracts.filter(c => c.status === 'pending').length;
  const approvedContracts = contracts.filter(c => c.status === 'approved').length;
  const completedContracts = contracts.filter(c => c.status === 'completed').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title={t('contracts.totalContracts')}
        value={totalContracts}
        icon={<FileText size={20} className="text-blue-600" />}
        trend="neutral"
      />
      
      <StatsCard
        title={t('contracts.draft')}
        value={draftContracts}
        icon={<FileText size={20} className="text-gray-600" />}
        trend="neutral"
      />
      
      <StatsCard
        title={t('contracts.pending')}
        value={pendingContracts}
        icon={<Clock size={20} className="text-yellow-600" />}
        trend="neutral"
      />
      
      <StatsCard
        title={t('contracts.completed')}
        value={completedContracts}
        icon={<CheckCircle size={20} className="text-green-600" />}
        trend="up"
      />
    </div>
  );
};

export default ContractStats;