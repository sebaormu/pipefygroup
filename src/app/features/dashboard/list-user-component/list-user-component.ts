import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiError, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import {  TuiFieldErrorPipe, TuiPagination } from '@taiga-ui/kit';
import { TuiTable } from '@taiga-ui/addon-table';
import { SupabaseService } from '../../../core/services/supabase/supabase-service';
import { RouterModule } from '@angular/router';
import { TuiForm } from '@taiga-ui/layout';


@Component({
  standalone: true,
  selector: 'app-list-user-component',
  imports: [
    CommonModule,
    FormsModule,
    TuiPagination,
    TuiTable,
    TuiIcon,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    ReactiveFormsModule,
    RouterModule,
    TuiForm,
  ],
  templateUrl: './list-user-component.html',
  styleUrl: './list-user-component.css'
})
export class ListUserComponent implements OnInit {
  protected selectedUser: any = null;
  listUsers = signal<any[]>([]);
  allUsers = signal<any[]>([]);

  protected index = 0;   
  protected size = 15;   
  protected length = 0; 
  
  protected readonly form = new FormGroup({
      search: new FormControl('', []),
    });
  

  constructor(private readonly supabaseService: SupabaseService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.supabaseService.getAllUsers()
      .subscribe(list => {
        this.allUsers.set(list?.users)
        this.listUsers.set(list?.users);
        this.length = this.listUsers().length / 15;
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
    this.index = 0;
    
    if (!this.form.value.search) {
      this.listUsers.set([...this.allUsers()]);
    } else {
      const searchTerm = this.form.value.search.toLowerCase();
      const filteredUsers = this.allUsers().filter((user: any) => 
        user.full_name?.toLowerCase().includes(searchTerm)
      );
      this.listUsers.set(filteredUsers);
    }
    
    this.length = Math.ceil(this.listUsers().length / this.size);
  }
}
