import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rol-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rolcrear.component.html',
  styleUrls: ['./rolcrear.component.css']
})
export class RolCrearComponent {
  rol = { nombre: '', descripcion: '', permisosSeleccionados: [] as string[] };

  permisosDisponibles = [
    { id: 'P01', nombre: 'Crear usuario' },
    { id: 'P02', nombre: 'Eliminar ventas' },
    { id: 'P03', nombre: 'Ver reportes' }
  ];

  constructor(private router: Router) {}

  togglePermiso(id: string) {
    const index = this.rol.permisosSeleccionados.indexOf(id);
    if (index === -1) {
      this.rol.permisosSeleccionados.push(id);
    } else {
      this.rol.permisosSeleccionados.splice(index, 1);
    }
  }

  guardarRol() {
    alert('Rol creado (simulado) con permisos: ' + this.rol.permisosSeleccionados.join(', '));
    this.router.navigate(['/roles']);
  }

  volver() {
    this.router.navigate(['/roles']);
  }
}