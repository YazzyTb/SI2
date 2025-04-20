import { Component } from '@angular/core';

@Component({
  selector: 'app-metodo-pago',
  imports: [],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css'
})
export class MetodoPagoComponent {
  filtro: string = '';

  metodoPago = [
    { id: 'MP1', nombre: 'Tarjeta de Credito', descripcion: 'Pagos tarjeta de credito' },
    { id: 'MP2', nombre: 'Tarjeta de Debito', descripcion: 'Pagos con tarjeta de debito' },
    { id: 'MP3', nombre: 'Paypal', descripcion: 'Billetera digital' }
  ];

  get metodoPagoFiltrados() {
    return this.metodoPago.filter(mp =>
      (mp.id + ' ' + mp.nombre).toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarMetodoPago(id: string) {
    if (confirm('¿Deseas eliminar este metodo de pago?')) {
      this.metodoPago = this.metodoPago.filter(mp => mp.id !== id);
    }
  }
}
