import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isVisible: boolean = true;

  dropdowns: { [key: string]: boolean } = {
    empleados: false,
    inventario: false,
    reportes: false
  };

  constructor(private router: Router) {}

  toggleDropdown(key: string): void {
    this.dropdowns[key] = !this.dropdowns[key];
  }

  cerrarSesion(): void {
    this.router.navigate(['/']);
  }
}
