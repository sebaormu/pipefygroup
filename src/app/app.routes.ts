import { Routes } from '@angular/router';
import { SidebarComponent } from './features/shared/sidebar-component/sidebar-component';

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      }
    ]
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
