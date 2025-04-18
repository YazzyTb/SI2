import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  filtro: string = '';
  estadoFiltro: string = '';
  empleados: any[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => this.empleados = res,
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        alert('No se pudieron cargar los empleados.');
      }
    });
  }

  eliminarEmpleado(codigo: number) {
    if (confirm('¿Deseas eliminar este empleado?')) {
      this.usuarioService.eliminarUsuario(codigo).subscribe({
        next: () => {
          this.empleados = this.empleados.filter(e => e.codigo !== codigo);
          alert('Empleado eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar empleado:', err);
          if (err.status === 404) {
            alert('El usuario no existe o ya fue eliminado.');
          } else if (err.status === 500) {
            alert('Error interno al intentar eliminar el empleado.');
          } else {
            alert('Ocurrió un error desconocido al eliminar.');
          }
        }
      });
    }
  }

  get empleadosFiltrados() {
    return this.empleados
      .filter(e =>
        (e.nombre + ' ' + e.apellido + ' ' + e.gmail + ' ' + e.rol)
          .toLowerCase()
          .includes(this.filtro.toLowerCase())
      )
      .filter(e => !this.estadoFiltro || e.estado?.toLowerCase() === this.estadoFiltro.toLowerCase());
  }
  // Paginación
  paginaActual = 1;
  itemsPorPagina = 5;

  get empleadosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.empleadosFiltrados.slice(inicio, inicio + this.itemsPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.empleadosFiltrados.length / this.itemsPorPagina);
  }

  cambiarPagina(direccion: number) {
    const nueva = this.paginaActual + direccion;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
    }
  }

}
