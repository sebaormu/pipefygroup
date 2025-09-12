import { Routes } from '@angular/router';
import { SidebarComponent } from './features/shared/sidebar-component/sidebar-component';
import { authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      }
    ]
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadChildren: () => import('./features/register/register.routes').then(m => m.REGISTER_ROUTES)
  },
];
