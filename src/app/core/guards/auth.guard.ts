import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SupabaseService } from "../services/supabase/supabase-service";
import { map, switchMap, take } from 'rxjs';


export const authGuard: CanActivateFn = () => {
    const supabaseService = inject(SupabaseService);
    const router = inject(Router);

    return supabaseService.isLoggedIn()
        .pipe(
            take(1),
            map(isAuthenticated => {
                if (isAuthenticated) {
                    return true;
                } else {
                    router.navigate(['/login']);
                    return false;
                }
            })
        );
};

export const publicGuard: CanActivateFn = () => {
    const supabaseService = inject(SupabaseService);
    const router = inject(Router);

    return supabaseService.isLoggedIn()
        .pipe(
            take(1),
            map(isAuthenticated => {
                if (!isAuthenticated) {
                    return true;
                } else {
                    router.navigate(['']);
                    return false;
                }
            })
        );
};
