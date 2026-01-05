import { ChangeDetectorRef, Component, Inject, Optional, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { USER_TOKEN } from './model/user_model';
import { AuthService } from './services/auth-ser';
import { isPlatformBrowser } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

 private authService: AuthService | null = null;

   constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
     private cdr: ChangeDetectorRef,
     @Optional() @Inject(USER_TOKEN) ssrUser: any,
     @Optional() auth: AuthService,

    
  ) {
    
     this.authService = auth ?? null;
    // ✅ Only assign AuthService when on Browser
    if (isPlatformBrowser(this.platformId)) {
      this.authService = auth ?? null;
      console.log("AuthService enabled in browser:", this.authService);
    } else {
      console.log("SSR mode: AuthService disabled");
    }
  }
  
 ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
    
        this.authService?.loadUser();
    }
  }
  login() {
    this.authService?.login();
  }

  
  

   
}
