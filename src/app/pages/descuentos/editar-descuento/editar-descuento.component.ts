import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DescuentosService } from '../../../services/descuentos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-descuento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-descuento.component.html',
  styleUrls: ['./editar-descuento.component.css']
})
export class EditarDescuentoComponent implements OnInit {
  descuento: any = {
    nombre: '',
    descripcion: '',
    monto: 0,
    fecha_Inicio: '',
    fecha_fin: '',
    estado: 'activo'
  };
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private descuentoService: DescuentosService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.descuentoService.getDescuentoById(this.id).subscribe({
      next: (res) => this.descuento = res,
      error: () => alert('❌ Error al cargar el descuento')
    });
  }

  actualizarDescuento() {
    if (!this.descuento.nombre || !this.descuento.monto) {
      alert('⚠️ Nombre y monto son obligatorios');
      return;
    }

    this.descuentoService.actualizarDescuento(this.id, this.descuento).subscribe({
      next: () => {
        alert('✅ Descuento actualizado correctamente');
        this.router.navigate(['/descuentos']);
      },
      error: () => alert('❌ Error al actualizar el descuento')
    });
  }

  volver() {
    this.router.navigate(['/descuentos']);
  }
}
