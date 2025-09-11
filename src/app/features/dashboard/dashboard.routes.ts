import { Routes } from "@angular/router";
import { HomeComponent } from "./home-component/home-component";
import { ListUserComponent } from "./list-user-component/list-user-component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: ListUserComponent
  }
];
