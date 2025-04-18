import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent {
  filtro: string = '';

  permisos = [
    { id: 'P01', nombre: 'Crear usuario', descripcion: 'Permite registrar nuevos usuarios' },
    { id: 'P02', nombre: 'Eliminar ventas', descripcion: 'Permite borrar ventas del sistema' },
    { id: 'P03', nombre: 'Ver reportes', descripcion: 'Accede al módulo de reportes' }
  ];

  get permisosFiltrados() {
    return this.permisos.filter(p =>
      (p.id + ' ' + p.nombre).toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarPermiso(id: string) {
    if (confirm('¿Deseas eliminar este permiso?')) {
      this.permisos = this.permisos.filter(p => p.id !== id);
    }
  }
}
