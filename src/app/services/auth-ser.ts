import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { USER_TOKEN } from '../model/user_model';
import { Store } from '@ngrx/store';
import { loadUserFail, loadUserSuccess, logout } from '../state/user/user.action';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {



//   constructor(  @Inject(PLATFORM_ID) private platformId: Object,
//                  private http: HttpClient,
//                  private cdr: ChangeDetectorRef,
//                  private store: Store,
//                 @Inject(USER_TOKEN) private ssrUser: any
            
//             ) {}
            @Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private store: Store
  ) {}

  loadUser(): void {

    if (!isPlatformBrowser(this.platformId)) {
      console.log('SSR → Skip HTTP call');
      return;
    }

    // this.store.dispatch(loadUser());

    this.http.get('/api/me').subscribe({
      next: (user: any) => {
        this.store.dispatch(

          loadUserSuccess({tokenPayload: user})
        );
      
      },
      error: (err) => {
        this.store.dispatch(loadUserFail({error: err.message || 'Failed to load user'}));
      }
    });
  }

  login(): void {
    window.location.href = '/login';
  }

  logout(): void {
    this.store.dispatch(logout());
    window.location.href = '/logout';
  }
}


  

  