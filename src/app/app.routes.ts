import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    //canActivate: [publicGuard],
    loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'register',
    //canActivate: [publicGuard],
    loadChildren: () => import('./features/register/register.routes').then(m => m.REGISTER_ROUTES)
  },
];
