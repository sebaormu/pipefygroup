import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    //canActivate: [publicGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
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
