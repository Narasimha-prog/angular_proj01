import { createReducer, on } from "@ngrx/store";

import {  loadUserFail, loadUserSuccess, login, loginFailure, loginSuccess, logout } from "./user.action";
import { AuthState } from "./user.model";



const initialState: AuthState = {
  tokenPayload: null,
  status: 'idle',
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(login, state => ({
    ...state,
    status: 'loading'
  })),

  on(loginSuccess, (state, { tokenPayload }) => ({
    ...state,
    tokenPayload,
    status: 'authenticated',
    error: null
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error
  })),

  on(loadUserSuccess, (state, { tokenPayload }) => ({
    ...state,
    tokenPayload,
    status: 'authenticated'
  })),

  on(logout, () => initialState)
);
