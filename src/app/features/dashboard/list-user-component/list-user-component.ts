import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiError, TuiFormatNumberPipe, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonSelect, TuiDataListWrapper, TuiFieldErrorPipe, TuiPagination, TuiSkeleton } from '@taiga-ui/kit';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiContext, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiLet } from '@taiga-ui/cdk/directives/let';
import { SupabaseService } from '../../../core/services/supabase/supabase-service';
import { catchError, of, switchMap } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-list-user-component',
  imports: [
    CommonModule,
    FormsModule,
    TuiDataListWrapper,
    TuiPagination,
    TuiTable,
    TuiIcon,
    TuiTextfield,
    TuiError,
    AsyncPipe,
    TuiFieldErrorPipe,
    ReactiveFormsModule
  ],
  templateUrl: './list-user-component.html',
  styleUrl: './list-user-component.css'
})
export class ListUserComponent implements OnInit {
  protected selectedUser: any = null;
  listUsers = signal<any[]>([]);
  allUsers = signal<any[]>([]);
  protected isLoading = true;

  protected index = 0;   
  protected size = 10;   
  protected length = 0; 
  
  protected readonly form = new FormGroup({
      search: new FormControl('', []),
    });
  

  constructor(private readonly supabaseService: SupabaseService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.isLoading = true;
    this.supabaseService.handleAuthCallback()
      .pipe(
        switchMap(user => this.supabaseService.getAllUsers(user?.access_token)),
        catchError(() => of({ users: [] }))
      )
      .subscribe(list => {
        this.allUsers.set(list?.users)
        this.listUsers.set(list?.users);
        this.length = this.listUsers().length / 10;
      });
  }

 
  
  get paginatedUsers() {
    const start = this.index * this.size;
    const end = start + this.size;
    return this.listUsers().slice(start, end);
  }

  onPageChange(pageIndex: number): void {
    this.index = pageIndex;
  }

  onSizeChange(newSize: number): void {
    this.size = newSize;
    this.index = 0; 
  }

  search(): void {
    this.listUsers.set(this.allUsers());
    this.listUsers.set(
      this.listUsers().filter((user: any) => {
        return user.full_name.includes(this.form.value.search!);
      })
    );  
    this.length = this.listUsers().length / 10;
  }
}
