import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, tuiDropdown, TuiGroup, TuiIcon, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiChevron, TuiDataListWrapper, TuiSelect, TuiStep } from '@taiga-ui/kit';
import { TuiCardLarge, TuiNavigation } from '@taiga-ui/layout';
import { SupabaseService } from '../../../core/services/supabase/supabase-service';

@Component({
  selector: 'app-sidebar-component',
  imports: [CommonModule,
    TuiButton,
    TuiIcon,
    TuiNavigation,
    TuiAvatar,
    RouterOutlet,
    CommonModule,
    RouterModule,
    TuiButton, TuiDataList, TuiDropdown,
    TuiButton,
    TuiDataList,
    TuiDataListWrapper,
    TuiDropdown,
    TuiSelect,
    TuiTextfield,
    TuiDataList,
    TuiDropdown,
    TuiIcon,
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {

  email = signal('')
  sidebarVisible = signal(false);
  dropdownStates = signal({
    reportes: false,
    aplicacion: false
  });
  protected open = false;
  protected readonly items = [
    {
      'item':'Cerrar sesión',
      'onClick': 'cerrarSesion'
    }
  ];

  itemsNav = [
    {
      'item':'/dashboard', 'icon':'@tui.home', 'title':'Dashboard'
    },
    {
      'item':'/users', 'icon':'@tui.users', 'title':'Usuarios'
    }
  ]

  constructor(private readonly supabaseService: SupabaseService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.supabaseService.loadUser().subscribe(user => {
      this.email.set(user.data.session.user.email)
    })
  }

  toggleSidebar(): void {
    this.sidebarVisible.set(!this.sidebarVisible());
  }

  toggleDropdown(dropdown: string): void {
    const currentStates = this.dropdownStates();
    this.dropdownStates.set({
      ...currentStates,
      [dropdown]: !currentStates[dropdown as keyof typeof currentStates]
    });
  }

  isDropdownOpen(dropdown: string): boolean {
    const states = this.dropdownStates();
    return states[dropdown as keyof typeof states];
  }

  onClick(onClick: string): void {
    if(onClick === 'cerrarSesion'){
      this.logOut();
      
    }
  }

  logOut(){
    this.supabaseService.signOut().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

  
}
