import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  filtro = '';
  estadoFiltro = '';
  clientes : any[] = [];

  constructor(private ClienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  get clientesFiltrados() {
    return this.clientes.filter(c => {
      const coincideBusqueda = `${c.nombre} ${c.telefono} ${c.Gmail} ${c.nit}`.toLowerCase().includes(this.filtro.toLowerCase());
      return coincideBusqueda
    });
  }
  cargarClientes() {
    this.ClienteService.getClientes().subscribe({
      next: (res) => this.clientes = res,
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        alert('No se pudieron cargar los empleados.');
      }
    });
  }

  eliminarCliente(id: number) {
    if (confirm('¿Deseas eliminar este cliente?')) {
      this.clientes = this.clientes.filter(c => c.id !== id);
    }
  }
  // Paginación
  paginaActual = 1;
  itemsPorPagina = 5;

  get clientesPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.clientesFiltrados.slice(inicio, inicio + this.itemsPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.clientesFiltrados.length / this.itemsPorPagina);
  }

  cambiarPagina(direccion: number) {
    const nueva = this.paginaActual + direccion;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
    }
  }
}
