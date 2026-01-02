import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./user.model";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthLoad = createSelector(
  selectAuthState,
  (state) => state.status=='loading'
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state) => state.status=='authenticated'
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error=='error' 
);

export const selectUserViewModel = createSelector(
  selectAuthState,
  (state) =>
    state.tokenPayload
      ? {
          email: state.tokenPayload.sub,
        }
      : null
);
