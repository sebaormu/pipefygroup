import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiError, TuiNotification, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase/supabase-service';
import { finalize } from 'rxjs';
import { AuthTokenResponse } from '@supabase/supabase-js';
import { FormValidateService } from '../../../core/services/form-validate/form-validate-service';
import { USER_LOGIN_VALIDATION } from '../../../core/validate/user.validate';
import { TuiFieldErrorContentPipe, TuiFieldErrorPipe } from '@taiga-ui/kit';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiForm,
    TuiError,
    TuiHeader,
    TuiTextfield, 
    RouterModule,
    TuiNotification],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginComponent {

  errorMessage = signal('');

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly router: Router,
    private readonly formValidate: FormValidateService
  ){}

  protected readonly formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  auth(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    
    this.errorMessage.set('');

    this.supabaseService.signIn(this.formLogin.value.email!, this.formLogin.value.password!)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe({
        next: (response: AuthTokenResponse) => {
          if (response.error) {
            this.handleAuthError(response.error);
            return;
          }
          this.router.navigate(['/register']);
        },
        error: (error) => {
          this.handleAuthError(error);
        }
      });
  }

  private handleAuthError(error: any): void {    
    const errorMap: Record<string, string> = {
      'Invalid login credentials': 'Credenciales inválidas. Por favor verifica tu email y contraseña.',
      'Email not confirmed': 'Por favor confirma tu email antes de iniciar sesión.',
      'User already registered': 'Este email ya está registrado. Intenta iniciar sesión.',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
      'Email format is invalid': 'El formato del email es inválido.'
    };

    const errorMessage = error.message || 'Error desconocido';
    const friendlyMessage = errorMap[errorMessage] || errorMessage;
    
    this.errorMessage.set(friendlyMessage);
  }
  
  fieldIsValid(nameField: string): boolean {
    return this.formValidate.fieldIsInvalid(this.formLogin, nameField);
  }

  errorField(nameField: string): string | null{
    const res = this.formValidate.errorField(this.formLogin, nameField, USER_LOGIN_VALIDATION);
    console.log("error", res)
    return res;
  }
}
