import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login-com',
  imports: [],
  templateUrl: './login-com.html',
  styleUrl: './login-com.scss',
})
export class LoginCom {
    constructor() {
      if(isPlatformBrowser(PLATFORM_ID)) {
        // Browser-specific code can go here
        console.log('LoginCom component initialized from the browser');

      }
      if(!isPlatformBrowser(PLATFORM_ID)) {
        // Server-specific code can go here
        console.log('LoginCom component initialized from the server');
      }
      
    }
}
