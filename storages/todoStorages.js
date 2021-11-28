import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'todos';

const todoStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem(KEY);
      if (!rawTodos) {
        throw new Error('No saved todos');
      }
      const savedTodos = JSON.parse(rawTodos);
      return savedTodos;
    } catch (e) {
      throw new Error('Failed to load todos');
    }
  },
  async set(data) {
    try {
      await AsyncStorage(KEY, JSON.stringify(data));
    } catch (e) {
      throw new Error('Failed to save todos');
    }
  },
};

export default todoStorage;
