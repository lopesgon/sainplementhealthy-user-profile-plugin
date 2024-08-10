// Define the LocalStorageService class
export default class LocalStorageService {
  private static readonly PREFIX = 'shupp_';

  private static getSanitizeKey(key: string): string {
    return `${this.PREFIX} ${key}`;
  }

  // Method to set an item in local storage
  public static setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.getSanitizeKey(key), serializedValue);
    } catch (error) {
      console.error(`Error setting item with key "${key}":`, error);
    }
  }

  // Method to get an item from local storage
  public static getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(this.getSanitizeKey(key));
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error getting item with key "${key}":`, error);
      return null;
    }
  }

  // Method to remove an item from local storage
  public static removeItem(key: string): void {
    try {
      localStorage.removeItem(this.getSanitizeKey(key));
    } catch (error) {
      console.error(`Error removing item with key "${key}":`, error);
    }
  }

  // Method to clear all items from local storage
  public static clear(): void {
    try {
      // Use a loop to remove all keys with the specific prefix
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  }
}
