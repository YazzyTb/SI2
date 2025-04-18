import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-empleado-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
  empleado = {
    nombre: '',
    apellido: '',
    gmail: '',
    telefono: '',
    contrasena: '',
    estado: 'activo',
    rol_nombre: ''
  };
  verPassword: boolean = false;

  roles: any[] = [];
  correoExiste = false;
  cargandoCorreo = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.obtenerRoles().subscribe({
      next: (res) => this.roles = res,
      error: () => alert('No se pudieron cargar los roles')
    });
  }

  validarCorreo() {
    const gmail = this.empleado.gmail.trim();
    if (!gmail) return;

    this.cargandoCorreo = true;
    this.usuarioService.validarCorreo(gmail).subscribe({
      next: (res) => this.correoExiste = res.existe,
      error: () => alert('Error validando el correo'),
      complete: () => this.cargandoCorreo = false
    });
  }

  crearEmpleado() {
    if (this.correoExiste) {
      alert('El correo ya está registrado');
      return;
    }

    this.usuarioService.crearUsuario(this.empleado).subscribe({
      next: () => {
        alert('Empleado registrado correctamente');
        this.router.navigate(['/empleados']);
      },
      error: (err) => {
        console.error('Error al crear empleado:', err);
        alert('No se pudo registrar el empleado');
      }
    });
  }

  volver() {
    this.router.navigate(['/empleados']);
  }
}
