import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { USER_TOKEN } from '../model/user_model';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {



  constructor(  @Inject(PLATFORM_ID) private platformId: Object,
                 private http: HttpClient,
                 private cdr: ChangeDetectorRef,
                 private store: Store,
                @Inject(USER_TOKEN) private ssrUser: any
            
            ) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    console.log("Fetching user info on browser...");
      this.http.get('/api/me').subscribe(
        {
        next: (user: any) => {
        console.log("User received:", user);
        this.ssrUser = user;
        this.cdr.detectChanges(); // ✨ Force UI update
      },
        error: () => this.ssrUser = null
        }
    );
    }
  }

 me() {
  if (!isPlatformBrowser(this.platformId)) {
    console.log("SSR → Skip HTTP call");
    return of(null); 
  }
  return this.http.get('/api/me');
}

  login(): void {
    window.location.href = '/login'; // server handles OAuth redirect
  }

  logout(): void {
    window.location.href = '/logout'; // server destroys session
  }
}
