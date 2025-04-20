import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MetodoPagoService } from '../../../services/metodo-pago.service';

@Component({
  selector: 'app-crear-metodo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-metodo.component.html',
  styleUrls: ['./crear-metodo.component.css']
})
export class CrearMetodoComponent {
  metodo = {
    nombre: ''
  };

  constructor(
    private metodoPagoService: MetodoPagoService,
    private router: Router
  ) {}

  guardarMetodo() {
    if (!this.metodo.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    this.metodoPagoService.crearMetodoPago(this.metodo).subscribe({
      next: () => {
        alert('✅ Método de pago creado exitosamente');
        this.router.navigate(['/metodos_pago']);
      },
      error: () => {
        alert('❌ Error al crear el método de pago');
      }
    });
  }

  volver() {
    this.router.navigate(['/metodos_pago']);
  }
}
