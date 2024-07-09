export function setLocalStorageKey(key: string, value: string): void {
  window.localStorage.setItem(key, value);
}

export function getLocalStorageKey(key: string): string | null {
  return window.localStorage.getItem(key);
}

export function deleteLocalStorageKey(key: string): void {
  window.localStorage.removeItem(key);
}

export enum Keys {
  RefreshingToken = 'refreshing',
  SignedIn = 'signed-in',
}
