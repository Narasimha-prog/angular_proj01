import { createReducer, on } from "@ngrx/store";
import { initialState } from "../tasks/task.reducer";
import { login } from "./user.action";




export const authReducer = createReducer(
  initialState,

  // Trigger loading user or login request
  on(login, (state) => ({
    ...state,
    loading: true,
    error: false
  })),

  on(AuthActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: false
  })),

  // Successful authentication
  on(AuthActions.loginSuccess, AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: false
  })),

  // Failed to load session user
  on(AuthActions.loadUserFail, (state) => ({
    ...state,
    loading: false,
    user: null,
    error: true
  })),

  // Logout action
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    loading: false
  }))
);
🧠 What this reducer doe