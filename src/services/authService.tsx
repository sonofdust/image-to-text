// authService.ts

import jwt from "jsonwebtoken";

const TOKEN_KEY = "my_app_token";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};
