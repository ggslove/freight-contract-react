import { translations } from './i18n/index.js';

// 获取浏览器语言
const getBrowserLanguage = () => {
  const language = navigator.language || navigator.userLanguage;
  return language.startsWith('zh') ? 'zh' : 'en';
};

// 获取存储的语言
const getStoredLanguage = () => {
  return localStorage.getItem('language') || getBrowserLanguage();
};

// 存储语言设置
const setStoredLanguage = (lang) => {
  localStorage.setItem('language', lang);
};

// 当前语言
let currentLanguage = getStoredLanguage();

// 翻译函数
export const t = (key, params = {}, fallback = key) => {
  const keys = key.split('.');
  let result = translations[currentLanguage];
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return fallback;
    }
  }
  
  if (typeof result === 'string' && params && Object.keys(params).length > 0) {
    // 支持模板变量替换，例如：{name} -> params.name
    let processedResult = result;
    Object.keys(params).forEach(paramKey => {
      const regex = new RegExp(`{${paramKey}}`, 'g');
      processedResult = processedResult.replace(regex, params[paramKey] || '');
    });
    return processedResult;
  }
  
  return result || fallback;
};

// 设置语言
export const setLanguage = (lang) => {
  if (['zh', 'en'].includes(lang)) {
    currentLanguage = lang;
    setStoredLanguage(lang);
    
    // 触发语言变更事件
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }
};

// 获取当前语言
export const getCurrentLanguage = () => currentLanguage;

// 获取可用语言
export const getAvailableLanguages = () => [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' }
];

// 监听语言变化
export const onLanguageChange = (callback) => {
  window.addEventListener('languageChanged', (event) => {
    callback(event.detail);
  });
};

// 初始化
export const initI18n = () => {
  // 可以在这里添加初始化逻辑
  console.log('i18n initialized with language:', currentLanguage);
};