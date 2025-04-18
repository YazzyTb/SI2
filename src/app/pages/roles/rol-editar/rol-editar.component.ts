import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rol-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css']
})
export class RolEditarComponent {
  rolId: number = 0;
  rol = { nombre: '', descripcion: '', permisosSeleccionados: [] as string[] };

  permisosDisponibles = [
    { id: 'P01', nombre: 'Crear usuario' },
    { id: 'P02', nombre: 'Eliminar ventas' },
    { id: 'P03', nombre: 'Ver reportes' }
  ];

  rolesMock = [
    { id: 1, nombre: 'Administrador', descripcion: 'Acceso total', permisosSeleccionados: ['P01', 'P02', 'P03'] },
    { id: 2, nombre: 'Cajero', descripcion: 'Gestión de ventas', permisosSeleccionados: ['P02'] },
    { id: 3, nombre: 'Supervisor', descripcion: 'Control de reportes', permisosSeleccionados: ['P03'] }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.rolId = Number(this.route.snapshot.paramMap.get('id'));
    const encontrado = this.rolesMock.find(r => r.id === this.rolId);
    if (encontrado) {
      this.rol = { ...encontrado };
    }
  }

  togglePermiso(id: string) {
    const index = this.rol.permisosSeleccionados.indexOf(id);
    if (index === -1) {
      this.rol.permisosSeleccionados.push(id);
    } else {
      this.rol.permisosSeleccionados.splice(index, 1);
    }
  }

  guardarCambios() {
    alert('Rol actualizado (simulado) con permisos: ' + this.rol.permisosSeleccionados.join(', '));
    this.router.navigate(['/roles']);
  }

  volver() {
    this.router.navigate(['/roles']);
  }
}
