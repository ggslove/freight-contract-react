# 表单样式系统

## 概述

我们已将所有表单相关的内联样式统一迁移到 `formStyle.js` 文件中，实现了样式的一致性和可维护性。

## 文件结构

- `src/styles/formStyle.js` - 统一表单样式定义
- 所有表单组件现在都使用 `FORM_STYLES` 常量引用样式

## 使用方法

### 1. 导入样式

在任何需要表单样式的组件中导入：

```javascript
import FORM_STYLES from '../../styles/formStyle';
```

### 2. 应用样式

使用 `FORM_STYLES` 中的预定义样式：

```javascript
// 模态框覆盖层
<div style={FORM_STYLES.modalOverlay}>

// 输入框
<input style={FORM_STYLES.inputField} />

// 标签
<label style={FORM_STYLES.inputLabel}>标签文本</label>

// 按钮
<button style={FORM_STYLES.buttonPrimary}>提交</button>
<button style={FORM_STYLES.buttonSecondary}>取消</button>
```

## 可用样式

### 模态框相关
- `modalOverlay` - 模态框背景遮罩
- `modalContainer` - 模态框容器
- `modalHeader` - 模态框头部
- `modalCloseButton` - 关闭按钮
- `formContainer` - 表单容器
- `formGrid` - 表单网格布局

### 表单元素
- `inputLabel` - 输入标签
- `inputField` - 输入框
- `selectField` - 选择框
- `textareaField` - 文本区域
- `checkboxField` - 复选框

### 按钮
- `buttonPrimary` - 主要按钮（蓝色）
- `buttonSecondary` - 次要按钮（白色）
- `deleteButton` - 删除按钮（红色）

### 列表和布局
- `sectionTitle` - 章节标题
- `itemGrid` - 项目网格布局
- `itemListHeader` - 列表头部
- `itemRow` - 列表行

## 已迁移的组件

以下组件已完全迁移到统一样式系统：

1. ✅ `ContractForm.jsx` - 合同表单
2. ✅ `CurrencyFormModal.jsx` - 币种表单
3. ✅ `UserFormModal.jsx` - 用户表单
4. ✅ `RoleFormModal.jsx` - 角色表单

## 响应式设计

样式系统包含响应式支持：

```javascript
// 获取响应式样式
const responsiveStyles = FORM_STYLES.getResponsiveStyles({
  base: { padding: '1rem' },
  sm: { padding: '1.5rem' },
  lg: { padding: '2rem' }
});
```

## 动画效果

包含表单动画：
- `fadeIn` - 淡入效果
- `slideIn` - 滑入效果

## 维护指南

1. **添加新样式**：在 `formStyle.js` 中添加新的样式常量
2. **修改现有样式**：直接在 `formStyle.js` 中修改，所有引用会自动更新
3. **组件特定样式**：如需特殊样式，可在组件中单独定义
4. **测试**：修改后请检查所有使用表单的页面是否正常显示

## 最佳实践

- 始终使用 `FORM_STYLES` 中的样式，避免重复定义
- 保持样式命名的一致性
- 对于复杂布局，使用组合样式而非覆盖
- 定期同步样式更新到所有组件