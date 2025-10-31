const AUTH_KEY = 'isAuthenticated';

export const setAuthenticated = (value: boolean): void => {
  if (value) {
    localStorage.setItem(AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

