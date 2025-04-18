import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  filtro: string = '';

  roles = [
    { id: 1, nombre: 'Administrador', descripcion: 'Acceso total', permisos: ['P01', 'P02', 'P03'] },
    { id: 2, nombre: 'Cajero', descripcion: 'Gestión de ventas', permisos: ['P02'] },
    { id: 3, nombre: 'Supervisor', descripcion: 'Control de reportes', permisos: ['P03'] }
  ];
  get rolesFiltrados() {
    return this.roles.filter(r =>
      (r.id + ' ' + r.nombre).toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarRol(id: number) {
    if (confirm('¿Deseas eliminar este rol?')) {
      this.roles = this.roles.filter(r => r.id !== id);
    }
  }
}
