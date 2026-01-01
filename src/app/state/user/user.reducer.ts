import { createReducer, on } from "@ngrx/store";
import { initialState } from "../tasks/task.reducer";
import { loadUser, loadUserFail, loadUserSuccess, login, logout } from "./user.action";




export const authReducer = createReducer(
  initialState,

  // Trigger loading user or login request
  on(login, (state) => ({
    ...state,
    loading: true,
    error: false
  })),

  on(loadUser, (state) => ({
    ...state,
    loading: true,
    error: false
  })),

  // Successful authentication
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: false
  })),

  // Failed to load session user
  on(loadUserFail, (state) => ({
    ...state,
    loading: false,
    user: null,
    error: true
  })),

  // Logout action
  on(logout, (state) => ({
    ...state,
    user: null,
    loading: false
  }))
);
