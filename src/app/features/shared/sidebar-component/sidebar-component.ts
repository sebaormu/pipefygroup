import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiCardLarge, TuiNavigation } from '@taiga-ui/layout';

@Component({
  selector: 'app-sidebar-component',
  imports: [CommonModule,
    TuiButton,
    TuiIcon,
    TuiNavigation,
    TuiAvatar,
    RouterOutlet,
    CommonModule,
  RouterModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {
  sidebarVisible = signal(false);

  dropdownStates = signal({
    reportes: false,
    aplicacion: false
  });

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
}
