# 🌍 全局错误处理使用指南

## 概述

我们已实现了全局错误处理系统，可以自动处理所有API调用和JavaScript错误，无需在每个页面重复try-catch。

## 🚀 快速开始

### 1. 使用包装后的服务

```javascript
// ❌ 旧方式 - 需要手动try-catch
import userService from '../services/userService';

try {
  const users = await userService.getAllUsers();
} catch (error) {
  showErrorToast('获取用户失败: ' + error.message);
}

// ✅ 新方式 - 自动处理错误
import { services } from '../services';

const users = await services.user.getAllUsers(); // 错误自动处理
```

### 2. 使用CRUD Hook（推荐）

```javascript
import { services } from '../services';
import { useCRUDService } from '../hooks/useServiceData';

const UserPage = () => {
  const { items: users, loading, create, update, remove } = useCRUDService(services.user);
  
  // 无需任何错误处理代码！
  const handleCreate = async (userData) => {
    await create(userData); // 错误自动处理
  };
  
  const handleUpdate = async (id, userData) => {
    await update(id, userData); // 错误自动处理
  };
  
  const handleDelete = async (id) => {
    await remove(id); // 错误自动处理
  };
  
  // ... 其他代码
};
```

### 3. 使用通用数据Hook

```javascript
import { useServiceData } from '../hooks/useServiceData';
import { services } from '../services';

const DashboardPage = () => {
  const { data: stats, loading, refresh } = useServiceData(
    () => services.dashboard.getStats(),
    [] // 依赖数组
  );
  
  // 错误自动处理，loading状态管理
};
```

## 🛠 手动使用工具函数

### 安全执行异步操作

```javascript
import { safeAsync, showSuccess } from '../utils/globalErrorHandler';

// 包装任何异步操作
const result = await safeAsync(
  () => someAsyncOperation(),
  '操作描述' // 用于错误消息前缀
);

// 显示成功消息
showSuccess('操作成功完成');
```

### 安全执行同步操作

```javascript
import { safeSync } from '../utils/globalErrorHandler';

const result = safeSync(
  () => someSyncOperation(),
  '操作描述'
);
```

## 📋 迁移指南

### 1. 替换服务导入

**旧代码：**
```javascript
import userService from '../services/userService';
```

**新代码：**
```javascript
import { services } from '../services';
// 使用 services.user 替代 userService
```

### 2. 移除try-catch块

**旧代码：**
```javascript
try {
  const users = await userService.getAllUsers();
  setUsers(users);
} catch (error) {
  showErrorToast('获取用户失败: ' + error.message);
}
```

**新代码：**
```javascript
const users = await services.user.getAllUsers();
setUsers(users);
```

### 3. 使用Hook简化状态管理

**旧代码：**
```javascript
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

const fetchUsers = async () => {
  try {
    setLoading(true);
    const data = await userService.getAllUsers();
    setUsers(data);
  } catch (error) {
    showErrorToast('获取用户失败: ' + error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);
```

**新代码：**
```javascript
const { items: users, loading } = useCRUDService(services.user);
```

## 🎯 完整示例

### 简化后的页面结构

```javascript
import React, { useState } from 'react';
import { services } from '../services';
import { useCRUDService } from '../hooks/useServiceData';

const UserPage = () => {
  const { items: users, loading, create, update, remove } = useCRUDService(services.user);
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = async (userData) => {
    await create(userData); // 自动错误处理
    setShowForm(false);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('确定删除吗？')) {
      await remove(id); // 自动错误处理
    }
  };
  
  if (loading) return <div>加载中...</div>;
  
  return (
    <div>
      {/* 页面内容 */}
    </div>
  );
};
```

## 🔧 自定义错误处理

如果需要特殊处理某些错误，仍然可以手动处理：

```javascript
const handleSpecialOperation = async () => {
  try {
    await services.user.specialOperation();
  } catch (error) {
    if (error.code === 'SPECIAL_ERROR') {
      // 特殊处理
    } else {
      // 让全局处理器处理
      throw error;
    }
  }
};
```

## ✅ 已支持的页面

- RolePage.new.jsx - 使用CRUD Hook的完整示例
- UserPage - 可类似简化
- CurrencyPage - 可类似简化
- ContractsPage - 可类似简化

## 🔄 下一步

1. 逐个页面迁移到新的错误处理系统
2. 使用CRUD Hook简化代码结构
3. 移除重复的try-catch块
4. 统一错误消息格式