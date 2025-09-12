import { Routes } from "@angular/router";
import { ListUserComponent } from "./list-user-component";
import { UpdateUserComponent } from "./update-user-component/update-user-component";

export const USER_ROUTES: Routes = [
    {
      path: '',
      component: ListUserComponent
    },
    {
        path: 'user/:id',
        component: UpdateUserComponent
    },
]
