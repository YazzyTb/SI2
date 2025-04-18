import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-empleado-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleado-detalle.component.html',
  styleUrls: ['./empleado-detalle.component.css']
})
export class EmpleadoDetalleComponent {
  empleadoId: number = 0;
  empleado: any;
  cargando = true;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuario(this.empleadoId).subscribe({
      next: (data) => {
        this.empleado = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar empleado', err);
        this.cargando = false;
      }
    });
  }

  volver() {
    history.back();
  }
}
