import { ApplicationConfig, Inject, inject, isDevMode, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

// NgRx imports (standalone API)
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Your store logic files
import { taskReducer } from './state/tasks/task.reducer';
import { TaskEffects } from './state/tasks/task.effects';
import { isPlatformBrowser } from '@angular/common';
import { debugMetaReducer } from './state/tasks/store-localstorage.meta-reducer';
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from './state/user/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(),
    //for routing
    provideRouter(routes),
    //for hydration
    provideClientHydration(withEventReplay()),

    // ✅ New NgRx provider-based API
    provideStore( 
      
      { tasks: taskReducer ,
        auth: authReducer
      }, 
      { metaReducers: [debugMetaReducer] }
    ),
    
    provideEffects(
           isPlatformBrowser(PLATFORM_ID) ? [TaskEffects] : []
    ),
    ...( isDevMode() ? [
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }) ]: []
  )
  ]
};
