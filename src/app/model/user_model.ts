import { InjectionToken } from '@angular/core';

export const USER_TOKEN = new InjectionToken('UserToken');

export interface User {
  id?: string;
  name?: string;
  email: string;
}


export interface AuthState {
  user: User | null;
  loading: boolean;
  error: boolean;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: false
};