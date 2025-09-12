import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TuiAppearance, TuiButton, TuiDataList, TuiDialogContext, TuiDialogService, TuiError, TuiTextfield } from '@taiga-ui/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiCardLarge, TuiForm } from '@taiga-ui/layout';
import { TuiSelect } from '@taiga-ui/kit';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { type PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { ROLES } from '../../../../core/models/roles.model';
import { STATUS_USER } from '../../../../core/models/status-user.model';
import { LANGUAGES } from '../../../../core/models/language.model';
import { SupabaseService } from '../../../../core/services/supabase/supabase-service';
import { FormValidateService } from '../../../../core/services/form-validate/form-validate-service';
import { USER_UPDATE_VALIDATION } from '../../../../core/validate/user.validate';


@Component({
  selector: 'app-update-user-component',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    TuiTextfield,
    TuiError,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiForm,
    TuiError,
    TuiTextfield,
    RouterModule,
    TuiDataList,
    TuiSelect,
    TuiTextfield,
    ScrollingModule
  ],
  templateUrl: './update-user-component.html',
  styleUrl: './update-user-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UpdateUserComponent implements OnInit {
  userId: string | null = null;
  user: any = null;
  isLoading = signal(false);
  roles = ROLES;
  roleSelected = signal('')
  statusUser = STATUS_USER;
  statusSelected = signal('');
  languageUser = LANGUAGES;
  languageSeleted = signal('')

  protected readonly form = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    phone: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService,
    private readonly formValidate: FormValidateService,
    private readonly dialog: TuiDialogService,

  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserDetails(this.userId);
    }
  }

  private loadUserDetails(userId: string) {
    this.isLoading.set(true);

    this.supabaseService.getUserById(userId)
      .subscribe(user => {
        this.user = user;
        this.isLoading.set(false);
        this.statusSelected.set(user.users[0].status.toUpperCase());
        this.roleSelected.set(user.users[0].role.toUpperCase());
        this.languageSeleted.set(user.users[0].language);
        this.form.get('full_name')?.setValue(user.users[0].full_name);
        this.form.get('email')?.setValue(user.users[0].email);
        this.form.get('phone')?.setValue(user.users[0].phone);
        this.form.get('role')?.setValue(this.roleSelected());
        this.form.get('status')?.setValue(this.statusSelected());
        this.form.get('language')?.setValue(this.languageSeleted());
      })
  }

  update(observer: any): void {
    if (!this.form.valid) return;
    this.supabaseService.updateUser(this.route.snapshot.paramMap.get('id')!,
      this.form.get('full_name')?.value ?? '',
      this.form.get('role')?.value ?? '',
      this.form.get('phone')?.value ?? '',
      this.form.get('language')?.value ?? '',
      this.form.get('status')?.value?.toLowerCase() ?? '')
      .subscribe(() => observer.complete())
  }

  protected showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialog.open(content).subscribe();
  }

  protected withdraw(observer: any): void {
    this.update(observer);

  }

  fieldIsValid(nameField: string): boolean {
    return this.formValidate.fieldIsInvalid(this.form, nameField);
  }

  errorField(nameField: string): string | null {
    return this.formValidate.errorField(this.form, nameField, USER_UPDATE_VALIDATION);
  }

}
