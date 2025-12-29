import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export function debugMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    // Skip server
    return reducer;
  }

  const wrappedReducer = localStorageSync( 
    { keys: ['tasks'],
      rehydrate: true ,
      storage: localStorage
    }
  )(reducer);


  return (state, action) => {
    console.log('[MetaReducer] Called for action:', action.type);
    console.log('[MetaReducer] State before reducer:', state);

    const nextState = wrappedReducer(state, action);

    console.log('[MetaReducer] State after reducer:', nextState);
    return nextState;
  };
}
