import { createAction, props } from "@ngrx/store";
import { AuthState, AuthTokenPayload } from "./user.model";

// 🔹 Trigger OAuth redirect or begin login flow
export const login = createAction('[Auth] Login');

// 🔹 When server sends authenticated user
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ tokenPayload: AuthTokenPayload }>()
);


export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);






export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ tokenPayload: AuthTokenPayload }>()
);
// 🔹 Failed to load session user or DI


export const loadUserFail = createAction(
  '[Auth] Load User Fail',
  props<{ error: string }>()
);


// 🔹 Clear session (logout)
export const logout = createAction('[Auth] Logout');
