import { createAction, props } from "@ngrx/store";
import { User } from "../../model/user_model";

// 🔹 Trigger OAuth redirect or begin login flow
export const login = createAction('[Auth] Login');

// 🔹 When server sends authenticated user
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

// 🔹 Load existing user from session (/api/me)
export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>()
);

export const loadUserFail = createAction('[Auth] Load User Fail');

// 🔹 Clear session (logout)
export const logout = createAction('[Auth] Logout');