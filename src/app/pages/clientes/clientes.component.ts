import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  filtro = '';
  estadoFiltro = '';

  clientes = [
    { id: 1, nombre: 'Carlos', apellido: 'González', telefono: '71234567', nit: '12345678', gmail: 'carlos@gmail.com', estado: 'activo' },
    { id: 2, nombre: 'Lucía', apellido: 'Mamani', telefono: '72345678', nit: '', gmail: 'lucia@gmail.com', estado: 'inactivo' },
    { id: 3, nombre: 'Diego', apellido: 'Rivera', telefono: '73456789', nit: '87654321', gmail: 'diego@gmail.com', estado: 'activo' }
  ];

  get clientesFiltrados() {
    return this.clientes.filter(c => {
      const coincideBusqueda = `${c.nombre} ${c.apellido}`.toLowerCase().includes(this.filtro.toLowerCase());
      const coincideEstado = !this.estadoFiltro || c.estado === this.estadoFiltro;
      return coincideBusqueda && coincideEstado;
    });
  }

  eliminarCliente(id: number) {
    if (confirm('¿Deseas eliminar este cliente?')) {
      this.clientes = this.clientes.filter(c => c.id !== id);
    }
  }
}
