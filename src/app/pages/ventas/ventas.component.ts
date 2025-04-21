import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];
  metodosPago: any[] = [];
  clientes: any[] = [];
  filtro = '';
  paginaActual = 1;
  itemsPorPagina = 5;

  constructor(
    private ventaService: VentaService,
    private metodoPagoService: MetodoPagoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.cargarMetodosPago();
    this.cargarClientes();
  }

  cargarVentas() {
    this.ventaService.getVentas().subscribe({
      next: (res) => {
        console.log('Ventas cargadas:', res);
        this.ventas = res;
      },
      error: (err) => console.error('Error al cargar ventas', err)
    });
  }

  cargarMetodosPago() {
    this.metodoPagoService.getMetodoPago().subscribe({
      next: (res) => this.metodosPago = res,
      error: (err) => console.error('Error al cargar métodos de pago', err)
    });
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (res) => this.clientes = res,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  obtenerNombreMetodoPago(id: number): string {
    const metodo = this.metodosPago.find(m => m.id === id);
    return metodo ? metodo.nombre : 'N/A';
  }

  obtenerNombreCliente(id: number): string {
    const cliente = this.clientes.find(c => c.id === id);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'N/A';
  }

  get ventasFiltradas() {
    return this.ventas.filter(v => {
      const clienteNombre = this.obtenerNombreCliente(v.cliente_id);
      return (`${clienteNombre} ${v.estado} ${v.fecha}` || '').toLowerCase().includes(this.filtro.toLowerCase());
    });
  }

  get paginadas() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.ventasFiltradas.slice(inicio, inicio + this.itemsPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.ventasFiltradas.length / this.itemsPorPagina);
  }

  cambiarPagina(direccion: number) {
    const nueva = this.paginaActual + direccion;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
    }
  }

  anularVenta(id: number) {
    if (confirm('¿Deseas anular esta venta?')) {
      this.ventas = this.ventas.filter(v => v.id !== id);
      // Aquí podrías agregar una llamada a tu servicio para marcarla como anulada
    }
  }
}
