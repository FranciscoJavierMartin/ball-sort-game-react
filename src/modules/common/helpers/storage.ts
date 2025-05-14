import isValidJson from '@/modules/common/helpers/is-valid-json';

const CACHE_KEY = 'BALL_SORT_GAME_PUZZLE';

type IStorageType = 'localStorage' | 'sessionStorage';

/**
 * Saves information in cache (session or localstorage)...
 * @param data
 * @param storageType
 */
export function saveCache(
  data: unknown,
  storageType: IStorageType = 'localStorage',
): void {
  const finalData = JSON.stringify(data);
  window[storageType].setItem(CACHE_KEY, finalData);
}

/**
 * Get the data stored in localStorage/sessionStorage
 * @param storageType
 * @returns
 */
export function getDataCache(storageType: IStorageType = 'localStorage') {
  const data = window[storageType].getItem(CACHE_KEY) || '';
  return data !== '' && isValidJson(data) ? JSON.parse(data) : {};
}

/**
 * Save property values to localstorage
 * @param property
 * @param value
 * @param storageType
 */
export function savePropierties(
  property: string,
  value: unknown,
  storageType: IStorageType = 'localStorage',
): void {
  const localCache = getDataCache(storageType);
  localCache[property] = value;
  saveCache(localCache, storageType);
}

/**
 * Store multiple keys at the same time...
 * @param data
 * @param storageType
 */
export function saveMultiplePropierties(
  data: Record<string, unknown>,
  storageType: IStorageType = 'localStorage',
): void {
  for (const key in data) {
    savePropierties(key, data[key], storageType);
  }
}

/**
 * Given a property, returns its information
 * @param key
 * @param initial
 * @param storageType
 * @returns
 */
export function getValueFromCache<T>(
  key: string = '',
  initial: T,
  storageType: IStorageType = 'localStorage',
): T {
  const localCache = getDataCache(storageType);
  return localCache[key] ?? initial;
}

/**
 * Deleting a key from localStorage...
 * @param property
 * @param storageType
 */
export function deleteProperty(
  property: string,
  storageType: IStorageType = 'localStorage',
): void {
  const localCache = getDataCache(storageType);
  if (localCache[property]) {
    delete localCache[property];
  }

  saveCache(localCache, storageType);
}
