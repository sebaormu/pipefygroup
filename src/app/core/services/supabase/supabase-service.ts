import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, AuthSession, AuthTokenResponse, createClient, OAuthResponse, SignUpWithPasswordCredentials, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Database } from '../../models/supabase.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient<Database>;
  private currentUser = new BehaviorSubject<User | null>(null);
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient
  ) {
    this.supabase = createClient<Database>(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.loadUser();
  }

  /**
   * Obtiene el cliente de Supabase
   */
  get client(): SupabaseClient<Database> {
    return this.supabase;
  }

  /**
   * Observable del usuario actual
   */
  get currentUser$(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  /**
   * Observable del estado de autenticación
   */
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  /**
   * Inicia sesión con email y contraseña
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Observable con la respuesta de autenticación
   */
  signIn(email: string, password: string): Observable<AuthTokenResponse> {
    console.log(email, password);
    return from(this.supabase.auth.signInWithPassword({ email, password }))
      .pipe(
        tap(response => {
          if (response.data.user) {
            this.setSession(response.data.user);
          }
        }),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Registra un nuevo usuario
   * @param user Datos del usuario a registrar
   * @returns Observable con la respuesta de autenticación
   */
  signUp(user: SignUpWithPasswordCredentials): Observable<AuthResponse> {
    return from(this.supabase.auth.signUp(user))
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Cierra la sesión del usuario actual
   * @returns Observable con el resultado de la operación
   */
  signOut(): Observable<void> {
    return from(this.supabase.auth.signOut())
      .pipe(
        tap(() => {
          this.currentUser.next(null);
          this.isAuthenticated.next(false);
        }),
        catchError(error => this.handleError(error))
      ).pipe(map(() => {
        this.currentUser.next(null);
        this.isAuthenticated.next(false);
      }));
  }

  /**
   * Recupera la contraseña del usuario
   * @param email Email del usuario
   * @returns Observable con el resultado de la operación
   */
  resetPassword(email: string): Observable<{ data: object | null; error: Error | null }> {
    return from(this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    }))
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Actualiza los datos del usuario actual
   * @param userData Datos a actualizar
   * @returns Observable con el usuario actualizado
   */
  updateProfile(userData: Database['public']['Tables']['users']['Update']): Observable<{
    data: any;
    error: Error | null;
  }> {
    return from(this.supabase.auth.getUser()).pipe(
      map(response => {
        if (!response.data.user) {
          throw new Error('Usuario no autenticado');
        }
        return response.data.user.id;
      }),
      switchMap(userId => {
        return from(this.supabase
          .from('users')
          .update(userData)
          .eq('id', userId)
          .select()
        ).pipe(
          tap(response => {
            if (!response.error && response.data && response.data.length > 0) {
              // Actualizar el usuario en el BehaviorSubject si es necesario
              this.getCurrentUser().subscribe();
            }
          }),
          catchError(error => this.handleError(error))
        );
      })
    );
  }

  /**
   * Obtiene el usuario actual desde Supabase
   * @returns Observable con el usuario actual
   */
  getCurrentUser(): Observable<User | null> {
    return from(this.supabase.auth.getUser())
      .pipe(
        tap(response => {
          if (response.data.user) {
            this.setSession(response.data.user);
          }
        }),
        map(response => response.data.user),
        catchError(error => {
          console.error('Error al obtener el usuario:', error);
          return of(null);
        })
      );
  }

  loadUser(): Observable<any> {
    return from(this.supabase.auth.getSession())
      .pipe(
        map(response => {
          const session = response.data.session;
          if (session) {
            this.setSession(session.user);
            return response;
          }
          return null;
        }),
        catchError(error => {
          console.error('Error al cargar la sesión:', error);
          return of(null);
        })
      );
  }

  /**
   * Establece la sesión del usuario
   * @param user Usuario de Supabase
   * @private
   */
  private setSession(user: User): void {
    if (user) {
      this.currentUser.next(user);
      this.isAuthenticated.next(true);
    }
  }

  /**
   * Maneja los errores de las peticiones a Supabase
   * @param error Error de Supabase
   * @returns Observable con el error
   * @private
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en Supabase:', error);

    const errorMessage = error.error?.message || error.message || 'Error desconocido';
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Inicia sesión con un proveedor OAuth (Google, Facebook, etc.)
   * @returns Observable con el resultado de la operación
   */
  signInWithProvider(): Observable<OAuthResponse> {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    return from(this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        scopes: 'email profile',
      }
    }))
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Procesa el callback de autenticación OAuth
   * @returns Observable con la sesión del usuario
   */
  handleAuthCallback(): Observable<AuthSession | null> {
    return from(this.supabase.auth.getSession())
      .pipe(
        tap(({ data: { session } }) => {
          if (session) {
            this.setSession(session.user);
          }
        }),
        map(({ data: { session } }) => session),
        catchError(error => this.handleError(error))
      );
  }

  getAllUsers(): Observable<any> {
    return this.http.get('https://nzgpjblqnjwjisobugse.supabase.co/functions/v1/get-all-uses');
  }

  getUserById(id: string): Observable<any> {
    
    return this.http.get(`https://nzgpjblqnjwjisobugse.supabase.co/functions/v1/get-user-id?id=${id}`);
  }

  updateUser(id: string, full_name: string , role: string, phone: string, language: string, status: string): Observable<any> {
    return this.http.post(`https://nzgpjblqnjwjisobugse.supabase.co/functions/v1/update-user`, {id, full_name, role, phone, language, status});
  }

  
  isLoggedIn(): Observable<boolean> {
    return this.http.get('https://nzgpjblqnjwjisobugse.supabase.co/functions/v1/isLogin')
    .pipe(
      map(response => {
        const res = response as { loggedIn: boolean };
        if(res.loggedIn){
          return true;
        }
        return false;
      }), catchError(()=>of(false))
    );
  }

  getToken(): Observable<String> {
    return from(this.supabase.auth.getSession()).pipe(
      map(response => {
        return response.data.session?.access_token || '';
      })
    );
  }
}
