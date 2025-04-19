import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { MetodoPagoService } from '../../services/metodo-pago.service';

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
  filtro = '';
  paginaActual = 1;
  itemsPorPagina = 5;

  constructor(
    private ventaService: VentaService,
    private MetodoPagoService: MetodoPagoService
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.cargarMetodosPago();
  }

  cargarVentas() {
    this.ventaService.getVentas().subscribe({
      next: (res) => this.ventas = res,
      error: (err) => console.error('Error al cargar ventas', err)
    });
  }

  cargarMetodosPago() {
    this.MetodoPagoService.getMetodos().subscribe({
      next: (res) => this.metodosPago = res,
      error: (err) => console.error('Error al cargar métodos de pago', err)
    });
  }

  obtenerNombreMetodoPago(id: number): string {
    const metodo = this.metodosPago.find(m => m.id === id);
    return metodo ? metodo.nombre : 'Desconocido';
  }

  get ventasFiltradas() {
    return this.ventas.filter(v =>
      (`${v.cliente?.nombre} ${v.estado} ${v.fecha}` || '').toLowerCase().includes(this.filtro.toLowerCase())
    );
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
    }
  }
}
