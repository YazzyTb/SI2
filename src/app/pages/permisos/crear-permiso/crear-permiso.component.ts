import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permiso-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-permiso.component.html',
  styleUrls: ['./crear-permiso.component.css']
})
export class CrearPermisoComponent {
  permiso = { id: '', nombre: '', descripcion: '' };
  permisos: any[] = [];

  constructor(private router: Router) {}

  registrarPermiso() {
    this.permisos.push({ ...this.permiso });
    this.permiso = { id: '', nombre: '', descripcion: '' };
    alert('Permiso registrado (simulado)');
    this.router.navigate(['/permisos']);
  }

  volver() {
    this.router.navigate(['/permisos']);
  }
}