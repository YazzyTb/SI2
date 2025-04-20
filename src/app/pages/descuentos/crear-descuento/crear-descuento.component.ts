import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DescuentosService } from '../../../services/descuentos.service';

@Component({
  selector: 'app-crear-descuento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-descuento.component.html',
  styleUrls: ['./crear-descuento.component.css']
})
export class CrearDescuentoComponent {
  descuento = {
    nombre: '',
    descripcion: '',
    monto: 0,
    fecha_Inicio: '',
    fecha_fin: '',
    estado: 'activo'
  };

  constructor(
    private descuentoService: DescuentosService,
    private router: Router
  ) {}

  guardarDescuento() {
    if (!this.descuento.nombre || !this.descuento.monto || !this.descuento.fecha_Inicio) {
      alert('Todos los campos obligatorios deben completarse');
      return;
    }
  
    this.descuentoService.crearDescuento(this.descuento).subscribe({
      next: () => {
        alert('✅ Descuento registrado correctamente');
        this.router.navigate(['/descuentos']);
      },
      error: () => {
        alert('❌ Error al registrar el descuento');
      }
    });
  }
  


  volver() {
    this.router.navigate(['/descuentos']);
  }
}