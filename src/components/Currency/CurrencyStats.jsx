import React from 'react';
import { DollarSign, CheckCircle, XCircle, Globe } from 'lucide-react';
import { t } from '../../utils/i18n';
import StatsCard from '../Common/StatsCard';

const CurrencyStats = ({ currencies }) => {
  const activeCurrencies = currencies.filter(c => c.isActive).length;
  const disabledCurrencies = currencies.filter(c => !c.isActive).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <StatsCard
        title={t('currency.totalCurrencies')}
        value={currencies.length}
        description={t('currency.totalCurrenciesDesc')}
        icon={<Globe size={20} />}
        color="#1890ff"
        bgColor="#e6f7ff"
      />
      
      <StatsCard
        title={t('currency.activeCurrencies')}
        value={activeCurrencies}
        description={t('currency.activeCurrenciesDesc')}
        icon={<CheckCircle size={20} />}
        color="#52c41a"
        bgColor="#f6ffed"
      />
      
      <StatsCard
        title={t('currency.disabledCurrencies')}
        value={disabledCurrencies}
        description={t('currency.disabledCurrenciesDesc')}
        icon={<XCircle size={20} />}
        color="#ff4d4f"
        bgColor="#fff2f0"
      />
    </div>
  );
};

export default CurrencyStats;