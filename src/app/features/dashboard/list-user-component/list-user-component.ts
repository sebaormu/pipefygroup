import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiFormatNumberPipe, TuiIcon } from '@taiga-ui/core';
import { TuiButtonSelect, TuiDataListWrapper, TuiPagination } from '@taiga-ui/kit';
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
    TuiIcon
  ],
  templateUrl: './list-user-component.html',
  styleUrl: './list-user-component.css'
})
export class ListUserComponent implements OnInit {
  protected selectedUser: any = null;
  protected filteredData: any[] = [];
  listUsers: any = signal([]);
  constructor(
    private readonly supabaseService: SupabaseService
  ){}

  ngOnInit() {
    this.filteredData = [...this.data];
    this.length = this.data.length;
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.supabaseService.handleAuthCallback()
      .pipe(
        switchMap(user => {
          return this.supabaseService.getAllUsers(user?.access_token)
        }),
        catchError(() => of([]))
      ).subscribe(list => {
        this.listUsers.set(list?.users)
        console.log(this.listUsers())
      })
  }

protected readonly data = [
    {
        id: 1,
        name: 'Alex Inkin',
        email: 'alex.inkin@example.com',
        balance: 1323525,
        status: 'Activo',
        lastLogin: '2025-09-10T10:30:00',
        country: 'Estados Unidos'
    },
    {
        id: 2,
        name: 'Roman Sedov',
        email: 'roman.sedov@example.com',
        balance: 423242,
        status: 'Inactivo',
        lastLogin: '2025-09-08T15:45:00',
        country: 'Rusia'
    },
] as const;

protected index = 0;
protected length = 10;
protected size = 10;


  
protected readonly items = [10, 50, 100];
protected readonly content: TuiStringHandler<TuiContext<number>> = ({$implicit}) =>
    `${$implicit} items per page`;

  selectUser(user: any): void {
    this.selectedUser = user;
  }

  onPageChange(pageIndex: number): void {
    this.index = pageIndex;
    // Add pagination logic here if needed
  }

}
