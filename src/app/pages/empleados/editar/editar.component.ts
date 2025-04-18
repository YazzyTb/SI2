import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-empleado-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  empleadoId: number = 0;
  empleado: any = {
    nombre: '',
    apellido: '',
    gmail: '',
    telefono: '',
    rol_id: null,
    estado: 'activo'
  };

  roles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));

    this.usuarioService.getUsuario(this.empleadoId).subscribe({
      next: (res) => {
        this.empleado = {
          nombre: res.nombre,
          apellido: res.apellido,
          gmail: res.gmail,
          telefono: res.telefono,
          rol_id: res.rol_id,
          estado: res.estado?.toLowerCase() || 'activo'
        };
      },
      error: (err) => {
        console.error('Error al cargar empleado:', err);
        alert('No se pudo cargar el empleado');
        this.router.navigate(['/empleados']);
      }
    });

    this.usuarioService.obtenerRoles().subscribe({
      next: (res) => this.roles = res,
      error: () => alert('No se pudieron cargar los roles')
    });
  }

  guardarCambios() {
    this.usuarioService.editarUsuario(this.empleadoId, this.empleado).subscribe({
      next: () => {
        alert('Cambios guardados correctamente');
        this.router.navigate(['/empleados']);
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        alert('No se pudieron guardar los cambios');
      }
    });
  }

  volver() {
    this.router.navigate(['/empleados']);
  }
}
