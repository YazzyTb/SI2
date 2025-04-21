import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  sidebarVisible = false;
  isMobile = false;
  dropdowns: { [key: string]: boolean } = {
    empleados: false,
    inventario: false,
    reportes: false,
    ventas: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 970;
    this.sidebarVisible = !this.isMobile;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    console.log('🔁 Sidebar visible:', this.sidebarVisible);
  }
  

  toggleDropdown(key: string): void {
    this.dropdowns[key] = !this.dropdowns[key];
  }

  cerrarSesion(): void {
    this.router.navigate(['/']);
  }
}
