import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiAppearance, TuiButton, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm } from '@taiga-ui/layout';
import { COUNTRY } from '../../../core/models/country.model';
import { FormValidateService } from '../../../core/services/form-validate/form-validate-service';
import { USER_REGISTRATION_VALIDATION } from '../../../core/validate/user.validate';
import { SupabaseService } from '../../../core/services/supabase/supabase-service';
import { catchError, finalize, of } from 'rxjs';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiTextfield, RouterModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {

  country = COUNTRY;
  countrySelected = 'Colombia';
  errorMessage = signal('');


  constructor(
    private readonly formValidate: FormValidateService,
    private readonly supabaseService: SupabaseService,
  ){}



  protected readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    country: new FormControl('Colombia', Validators.required),
  });

  register(): void {
    if (this.form.invalid) return;
    this.errorMessage.set('');

    this.supabaseService.signUp(this.buildUserRegister())
      .pipe(
        finalize(() => {
        }),
        catchError((err) => {
          this.handleAuthError(err);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (!response) return;
        
        if (response.error) {
          this.handleAuthError(response.error);
        } else {
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
      return this.formValidate.fieldIsInvalid(this.form, nameField);
    }
  
    errorField(nameField: string): string | null{
      return this.formValidate.errorField(this.form, nameField, USER_REGISTRATION_VALIDATION);
    }

    private buildUserRegister(): SignUpWithPasswordCredentials {
      return {
        email: this.form.value.email!,
        password: this.form.value.password!,
        options: {
          emailRedirectTo: `${window.location.origin}/email-confirmation`,
          data: {
            full_name: this.form.value.fullName,
            role: 'USER',
            country_code: this.form.value.country,
          }
        }
      };
    }
}
