import React from 'react';
import { Ship, Target, Zap, Users } from 'lucide-react';
import { t } from '../utils/i18n';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* 页面头部 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
          <Ship className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('about.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('about.subtitle')}
        </p>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 系统目标 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg mr-3">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('about.goals')}
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {t('about.goalsDescription')}
          </p>
        </div>

        {/* 核心功能 */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg mr-3">
              <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('about.features')}
            </h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('about.feature1')}
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('about.feature2')}
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('about.feature3')}
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t('about.feature4')}
            </li>
          </ul>
        </div>
      </div>

      {/* 适用对象 */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg mr-3">
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about.targetUsers')}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t('about.freightForwarder')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('about.freightForwarderDesc')}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t('about.shippingCompany')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('about.shippingCompanyDesc')}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t('about.logisticsCompany')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('about.logisticsCompanyDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* 系统特色 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t('about.systemFeatures')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {t('about.multiCurrency')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('about.multiCurrencyDesc')}
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {t('about.realTimeVisualization')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('about.realTimeVisualizationDesc')}
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {t('about.smartSearch')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('about.smartSearchDesc')}
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {t('about.responsiveDesign')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('about.responsiveDesignDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* 技术架构 */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t('about.techArchitecture')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong className="block mb-2">{t('about.frontendTech')}：</strong>
            <ul className="space-y-1 text-sm">
              <li>• React 18 + Vite</li>
              <li>• React Router 6</li>
              <li>• {t('about.traditionalCSS')}</li>
              <li>• Chart.js {t('about.dataVisualization')}</li>
            </ul>
          </div>
          
          <div>
            <strong className="block mb-2">{t('about.coreFeatures')}：</strong>
            <ul className="space-y-1 text-sm">
              <li>• {t('about.componentArchitecture')}</li>
              <li>• {t('about.responsiveDesign')}</li>
              <li>• {t('about.stateManagement')}</li>
              <li>• {t('about.routingManagement')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 系统总结 */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {t('about.systemSummary')}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;