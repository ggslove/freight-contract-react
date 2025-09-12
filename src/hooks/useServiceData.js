import { useState, useEffect } from 'react';
import { safeAsync } from '../utils/globalErrorHandler';

// 通用的数据获取Hook
export const useServiceData = (serviceMethod, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await safeAsync(serviceMethod, '数据获取');
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  // 提供刷新方法
  const refresh = () => {
    fetchData();
  };

  return { data, loading, error, refresh };
};

// 专门用于CRUD操作的Hook
export const useCRUDService = (service, options = {}) => {
  const [items, setItems] = useState([]);
  const { data, loading, refresh } = useServiceData(
    () => service.getAll(),
    [service]
  );

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const create = async (itemData) => {
    const newItem = await safeAsync(
      () => service.create(itemData),
      '创建记录'
    );
    setItems([...items, newItem]);
    return newItem;
  };

  const update = async (id, itemData) => {
    const updatedItem = await safeAsync(
      () => service.update(id, itemData),
      '更新记录'
    );
    setItems(items.map(item => item.id === id ? updatedItem : item));
    return updatedItem;
  };

  const remove = async (id) => {
    await safeAsync(
      () => service.delete(id),
      '删除记录'
    );
    setItems(items.filter(item => item.id !== id));
  };

  return {
    items,
    loading,
    create,
    update,
    remove,
    refresh
  };
};