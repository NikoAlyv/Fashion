import {MMKV} from 'react-native-mmkv';
import {
  StorageKeys,
  StorageMethodsKeys,
  TFunctionalMethod,
} from '../types/localstorage.types';
import {IUser} from '../types/user';

const storage = new MMKV();
export class LocalStorage {
  private static set(key: StorageKeys, method: StorageMethodsKeys, data?: any) {
    if (['string', 'number', 'boolean'].includes(method)) {
      storage.set(key, data as string | number | boolean);
    } else if (['object', 'array'].includes(method)) {
      storage.set(key, JSON.stringify(data));
    } else {
      throw new Error("LocalStorage method isn't supported");
    }
  }

  public static user(method: TFunctionalMethod, data?: IUser) {
    if (method === 'get') {
      const user = storage.getString(StorageKeys.user);
      return user ? JSON.parse(user) : null;
    }
    this.set(StorageKeys.user, 'object', data);
  }
  public static clean(key: StorageKeys | StorageKeys[] | 'all') {
    if (key === 'all') {
      storage.clearAll();
    } else if (Array.isArray(key)) {
      key.forEach(k => storage.delete(k));
    } else {
      storage.delete(key);
    }
  }
}
