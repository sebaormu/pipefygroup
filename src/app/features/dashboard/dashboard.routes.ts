import { Routes } from "@angular/router";
import { HomeComponent } from "./home-component/home-component";
import { ListUserComponent } from "./list-user-component/list-user-component";
import { UpdateUserComponent } from "./list-user-component/update-user-component/update-user-component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];
