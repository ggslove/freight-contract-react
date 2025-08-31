import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FileText, DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { t } from '../utils/i18n';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalContracts: 0,
    totalReceivables: 0,
    totalPayables: 0,
    netCashflow: 0
  });

  const [recentContracts, setRecentContracts] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // 模拟数据 - 根据日期筛选
  const fetchData = (startDate, endDate) => {
    // 模拟根据日期范围筛选数据
    const mockContracts = [
      { id: 1, businessNo: 'HT2024001', client: 'ABC国际贸易公司', sailDate: '2024-01-15', receivables: 85000, payables: 68000, status: '已确认' },
      { id: 2, businessNo: 'HT2024002', client: 'XYZ物流公司', sailDate: '2024-01-20', receivables: 120000, payables: 95000, status: '运输中' },
      { id: 3, businessNo: 'HT2024003', client: 'DEF供应链', sailDate: '2024-01-25', receivables: 75000, payables: 60000, status: '已完成' },
      { id: 4, businessNo: 'HT2024004', client: 'GHI货运代理', sailDate: '2024-02-05', receivables: 95000, payables: 78000, status: '已确认' },
      { id: 5, businessNo: 'HT2024005', client: 'JKL贸易集团', sailDate: '2024-02-10', receivables: 135000, payables: 110000, status: '运输中' },
    ];

    // 筛选在日期范围内的合同
    const filteredContracts = mockContracts.filter(contract => {
      const sailDate = new Date(contract.sailDate);
      return sailDate >= new Date(startDate) && sailDate <= new Date(endDate);
    });

    // 计算统计数据
    const totalContracts = filteredContracts.length;
    const totalReceivables = filteredContracts.reduce((sum, c) => sum + c.receivables, 0);
    const totalPayables = filteredContracts.reduce((sum, c) => sum + c.payables, 0);
    const netCashflow = totalReceivables - totalPayables;

    setStats({
      totalContracts,
      totalReceivables,
      totalPayables,
      netCashflow
    });

    setRecentContracts(filteredContracts.slice(0, 5));
  };

  useEffect(() => {
    fetchData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 币种分布图表数据
  const currencyData = {
    labels: ['人民币', '美元', '欧元', '英镑'],
    datasets: [
      {
        data: [65, 25, 8, 2],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      },
    ],
  };

  // 应收应付对比图表数据
  const receivablesPayablesData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '应收金额',
        data: [280000, 320000, 290000, 350000, 380000, 420000],
        backgroundColor: '#3B82F6',
      },
      {
        label: '应付金额',
        data: [220000, 260000, 240000, 290000, 310000, 340000],
        backgroundColor: '#EF4444',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(amount);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 日期筛选器 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        padding: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Calendar style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{t('dashboard.startDate')}:</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{t('dashboard.endDate')}:</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          <button
            onClick={() => {
              const today = new Date();
              const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
              setDateRange({
                startDate: monthStart.toISOString().split('T')[0],
                endDate: today.toISOString().split('T')[0]
              });
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            {t('dashboard.thisMonth')}
          </button>
          <button
            onClick={() => {
              const today = new Date();
              const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
              const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
              setDateRange({
                startDate: lastMonthStart.toISOString().split('T')[0],
                endDate: lastMonthEnd.toISOString().split('T')[0]
              });
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            {t('dashboard.lastMonth')}
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
          {t('dashboard.overview')} ({dateRange.startDate} {t('common.to')} {dateRange.endDate})
        </h2>
        <div className="grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <div className="stat-card" style={{
            backgroundColor: '#eff6ff',
            borderRadius: '0.5rem',
            padding: '1rem',
            borderLeft: '4px solid #2563eb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{t('dashboard.totalContracts')}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem', color: '#2563eb' }}>{stats.totalContracts}</h3>
              </div>
              <FileText style={{ color: '#2563eb', fontSize: '1.5rem' }} />
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#16a34a' }}>{t('dashboard.dateRange')}</p>
          </div>

          <div className="stat-card" style={{
            backgroundColor: '#f0fdf4',
            borderRadius: '0.5rem',
            padding: '1rem',
            borderLeft: '4px solid #16a34a'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{t('dashboard.totalReceivables')}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem', color: '#16a34a' }}>{formatCurrency(stats.totalReceivables)}</h3>
              </div>
              <TrendingUp style={{ color: '#16a34a', fontSize: '1.5rem' }} />
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#16a34a' }}>合同开航日期范围内</p>
          </div>

          <div className="stat-card" style={{
            backgroundColor: '#fef2f2',
            borderRadius: '0.5rem',
            padding: '1rem',
            borderLeft: '4px solid #dc2626'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{t('dashboard.totalPayables')}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem', color: '#dc2626' }}>{formatCurrency(stats.totalPayables)}</h3>
              </div>
              <TrendingDown style={{ color: '#dc2626', fontSize: '1.5rem' }} />
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#dc2626' }}>合同开航日期范围内</p>
          </div>

          <div className="stat-card" style={{
            backgroundColor: '#faf5ff',
            borderRadius: '0.5rem',
            padding: '1rem',
            borderLeft: '4px solid #9333ea'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{t('dashboard.netProfit')}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem', color: '#9333ea' }}>{formatCurrency(stats.netCashflow)}</h3>
              </div>
              <DollarSign style={{ color: '#9333ea', fontSize: '1.5rem' }} />
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#16a34a' }}>合同开航日期范围内</p>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('dashboard.latestContracts')}</h3>
          <div style={{ height: '16rem' }}>
            <Doughnut data={currencyData} options={chartOptions} />
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('dashboard.receivablesPayables')}</h3>
          <div style={{ height: '16rem' }}>
            <Bar data={receivablesPayablesData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 最近合同 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        padding: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{t('dashboard.recentContracts')}</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            minWidth: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            position: 'relative'
          }}>
            <thead>
              <tr>
                <th style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f9fafb',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{t('contracts.contractNumber')}</th>
                <th style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f9fafb',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{t('contracts.customer')}</th>
                <th style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f9fafb',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{t('contracts.departureDate')}</th>
                <th style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f9fafb',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{t('contracts.receivables')}</th>
                <th style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f9fafb',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{t('contracts.payables')}</th>
                <th style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f9fafb',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  position: 'sticky',
                  right: 0,
                  zIndex: 10,
                  boxShadow: '-2px 0 4px -2px rgba(0, 0, 0, 0.1)'
                }}>{t('common.status')}</th>
              </tr>
            </thead>
            <tbody>
              {recentContracts.map((contract) => (
                <tr key={contract.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '500', color: '#111827', whiteSpace: 'nowrap' }}>{contract.businessNo}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', whiteSpace: 'nowrap' }}>{contract.client}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280', whiteSpace: 'nowrap' }}>{contract.sailDate}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', whiteSpace: 'nowrap' }}>{formatCurrency(contract.receivables)}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', whiteSpace: 'nowrap' }}>{formatCurrency(contract.payables)}</td>
                  <td style={{
                    padding: '1rem',
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    right: 0,
                    backgroundColor: 'white',
                    zIndex: 5,
                    boxShadow: '-2px 0 4px -2px rgba(0, 0, 0, 0.1)'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '9999px',
                      backgroundColor: contract.status === '已完成' ? '#dcfce7' : 
                                      contract.status === '运输中' ? '#fef3c7' : '#dbeafe',
                      color: contract.status === '已完成' ? '#166534' : 
                             contract.status === '运输中' ? '#92400e' : '#1e40af'
                    }}>
                      {contract.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;