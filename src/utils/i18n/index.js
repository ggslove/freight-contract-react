// 导入所有翻译模块
import { commonTranslations } from './common.js';
import { navigationTranslations } from './navigation.js';
import { dashboardTranslations } from './dashboard.js';
import { contractsTranslations } from './contracts.js';
import { currenciesTranslations } from './currencies.js';
import { systemTranslations } from './system.js';
import { aboutTranslations } from './about.js';

// 深度合并对象
const deepMerge = (target, source) => {
  const result = { ...target };
  
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  });
  
  return result;
};

// 合并所有翻译
const mergeTranslations = (modules) => {
  const result = { zh: {}, en: {} };
  
  modules.forEach(module => {
    Object.keys(module).forEach(lang => {
      result[lang] = deepMerge(result[lang], module[lang]);
    });
  });
  
  return result;
};

// 合并所有翻译模块
const translations = mergeTranslations([
  commonTranslations,
  navigationTranslations,
  dashboardTranslations,
  contractsTranslations,
  currenciesTranslations,
  systemTranslations,
  aboutTranslations
]);

// 导出合并后的翻译
export { translations };