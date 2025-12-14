import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'inventory_items';

export const getItems = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveItems = async (items) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
};
