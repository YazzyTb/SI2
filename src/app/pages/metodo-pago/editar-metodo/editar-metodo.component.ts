import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-metodo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-metodo.component.html',
  styleUrls: ['./editar-metodo.component.css']
})
export class EditarMetodoComponent implements OnInit {
  metodo: any = {
    nombre: ''
  };
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metodoPagoService: MetodoPagoService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.metodoPagoService.getMetodoPagoById(this.id).subscribe({
      next: (res) => this.metodo = res,
      error: () => alert('Error al cargar el método de pago')
    });
  }

  actualizarMetodo() {
    if (!this.metodo.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    this.metodoPagoService.actualizarMetodoPago(this.id, this.metodo).subscribe({
      next: () => {
        alert('✅ Método de pago actualizado');
        this.router.navigate(['/metodos_pago']);
      },
      error: () => alert('❌ Error al actualizar el método de pago')
    });
  }

  volver() {
    this.router.navigate(['/metodos_pago']);
  }
}
