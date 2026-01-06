import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export function authStorageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {

  const platformId = inject(PLATFORM_ID);

  // 🚫 Do nothing on server
  if (!isPlatformBrowser(platformId)) {
    return reducer;
  }

  const wrappedReducer = localStorageSync({
    keys: [
      {
        auth: ['tokenPayload'],
        
      }
    ],
    rehydrate: true,
    storage: localStorage
  })(reducer);

  return (state, action,) => {
    console.log('[AuthMetaReducer] Action:', action.type);
    console.log('[AuthMetaReducer] Before:', state);

    const nextState = wrappedReducer(state, action);

    console.log('[AuthMetaReducer] After:', nextState);
    return nextState;
  };
}
