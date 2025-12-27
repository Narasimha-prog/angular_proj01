import { Routes } from '@angular/router';
import { LoginCom } from './auth/login-com/login-com';
import { HomeCom } from './dashboard/home-com/home-com';

export const routes: Routes = [
    {path: '',component:LoginCom},
    
    {path: 'dashboard',component:HomeCom}
];
