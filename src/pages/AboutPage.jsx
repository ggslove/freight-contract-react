import React from 'react';
import { Ship, Target, Zap, Users } from 'lucide-react';
import { t } from '../utils/i18n';

const AboutPage = () => {
  return (
    <div className="container">
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Ship style={{ width: '4rem', height: '4rem', color: '#2563eb', margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>{t('about.title')}</h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>{t('about.subtitle')}</p>
        </div>

        <div style={{ maxWidth: 'none' }}>
          <div className="grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: '#eff6ff',
              padding: '1.5rem',
              borderRadius: '0.5rem'
            }}>
              <Target style={{ width: '2rem', height: '2rem', color: '#2563eb', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{t('about.goals')}</h3>
              <p style={{ color: '#374151' }}>
                {t('about.goalsDescription')}
              </p>
            </div>

            <div style={{
              backgroundColor: '#f0fdf4',
              padding: '1.5rem',
              borderRadius: '0.5rem'
            }}>
              <Zap style={{ width: '2rem', height: '2rem', color: '#16a34a', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{t('about.features')}</h3>
              <ul style={{ color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>• {t('about.feature1')}</li>
                <li>• {t('about.feature2')}</li>
                <li>• {t('about.feature3')}</li>
                <li>• {t('about.feature4')}</li>
              </ul>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            marginBottom: '2rem'
          }}>
            <Users style={{ width: '2rem', height: '2rem', color: '#9333ea', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{t('about.targetUsers')}</h3>
            <div className="grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{ fontWeight: '600', color: '#111827' }}>{t('about.freightForwarder')}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem' }}>{t('about.freightForwarderDesc')}</p>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{ fontWeight: '600', color: '#111827' }}>{t('about.shippingCompany')}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem' }}>{t('about.shippingCompanyDesc')}</p>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{ fontWeight: '600', color: '#111827' }}>{t('about.logisticsCompany')}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem' }}>{t('about.logisticsCompanyDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('about.systemFeatures')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  borderLeft: '4px solid #2563eb',
                  paddingLeft: '1rem'
                }}>
                  <h4 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{t('about.multiCurrency')}</h4>
                  <p style={{ color: '#374151' }}>
                    {t('about.multiCurrencyDesc')}
                  </p>
                </div>

                <div style={{
                  borderLeft: '4px solid #16a34a',
                  paddingLeft: '1rem'
                }}>
                  <h4 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{t('about.realTimeVisualization')}</h4>
                  <p style={{ color: '#374151' }}>
                    {t('about.realTimeVisualizationDesc')}
                  </p>
                </div>

                <div style={{
                  borderLeft: '4px solid #9333ea',
                  paddingLeft: '1rem'
                }}>
                  <h4 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{t('about.smartSearch')}</h4>
                  <p style={{ color: '#374151' }}>
                    {t('about.smartSearchDesc')}
                  </p>
                </div>

                <div style={{
                  borderLeft: '4px solid #f97316',
                  paddingLeft: '1rem'
                }}>
                  <h4 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{t('about.responsiveDesign')}</h4>
                  <p style={{ color: '#374151' }}>
                    {t('about.responsiveDesignDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(to right, #2563eb, #9333ea)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{t('about.techArchitecture')}</h3>
              <div className="grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                fontSize: '0.875rem'
              }}>
                <div>
                  <strong>{t('about.frontendTech')}：</strong>
                  <ul style={{ marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <li>• React 18 + Vite</li>
                    <li>• React Router 6</li>
                    <li>• {t('about.traditionalCSS')}</li>
                    <li>• Chart.js {t('about.dataVisualization')}</li>
                  </ul>
                </div>
                <div>
                  <strong>{t('about.coreFeatures')}：</strong>
                  <ul style={{ marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <li>• {t('about.componentArchitecture')}</li>
                    <li>• {t('about.responsiveDesign')}</li>
                    <li>• {t('about.stateManagement')}</li>
                    <li>• {t('about.routingManagement')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#4b5563' }}>
                {t('about.systemSummary')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;