import { Routes } from "@angular/router";
import { HomeComponent } from "./home-component/home-component";
import { ListUserComponent } from "./list-user-component/list-user-component";
import { UpdateUserComponent } from "./update-user-component/update-user-component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: ListUserComponent
  },
  {
    path: 'user/:id',
    component: UpdateUserComponent
  }
];
