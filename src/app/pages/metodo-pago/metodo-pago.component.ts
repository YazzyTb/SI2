import { Component, OnInit } from '@angular/core';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {
  metodos: any[] = [];
  filtro: string = '';

  constructor(private metodoPagoService: MetodoPagoService) {}

  ngOnInit(): void {
    this.metodoPagoService.getMetodoPago().subscribe({
      next: res => this.metodos = res,
      error: err => alert('Error al cargar los métodos de pago')
    });
  }

  get metodosFiltrados() {
    return this.metodos.filter(m =>
      m.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarMetodo(id: number) {
    if (confirm('¿Deseas eliminar este método de pago?')) {
      this.metodoPagoService.eliminarMetodoPago(id).subscribe({
        next: () => {
          this.metodos = this.metodos.filter(m => m.id !== id);
        },
        error: () => alert('❌ Error al eliminar el método de pago')
      });
    }
  }
}
