'use client';

/**
 * Utility for saving/loading state to localStorage in class components.
 * Works like the class component version of useLocalStorage hook.
 */
const LocalStorageHelper = {
  /**
   * Save a value to localStorage under the given key.
   */
  set(key, value) {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  },

  /**
   * Load a value from localStorage. Returns defaultValue if not found.
   */
  get(key, defaultValue) {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return defaultValue;
  }
};

export default LocalStorageHelper;