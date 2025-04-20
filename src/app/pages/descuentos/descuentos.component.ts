import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DescuentosService } from '../../services/descuentos.service';

@Component({
  selector: 'app-descuento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.css']
})
export class DescuentosComponent implements OnInit {
  descuentos: any[] = [];
  busqueda: string = '';
  filtroEstado: string = '';

  constructor(
    private descuentoService: DescuentosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerDescuentos(); // Esta función también hará la verificación
  }
  obtenerDescuentos() {
    this.descuentoService.getDescuentos().subscribe({
      next: (res) => {
        this.descuentos = res;
        this.verificarFechasDescuentos(); // ← aquí agregas la lógica
      },
      error: () => {
        alert('❌ Error al cargar los descuentos');
      }
    });
  }
  
  verificarDescuentosActivos() {
    const hoy = new Date().toISOString().split('T')[0]; // formato: yyyy-mm-dd
  
    this.descuentos.forEach((d: any) => {
      const fechaInicio = new Date(d.fecha_Inicio).toISOString().split('T')[0];
  
      if (d.estado === 'activo' && fechaInicio === hoy) {
        this.mostrarNotificacionPush(d);
      }
    });
  }
  mostrarNotificacionPush(descuento: any) {
    if (Notification.permission === 'granted') {
      new Notification(`🎉 Nuevo descuento activo: ${descuento.nombre}`, {
        body: `¡${descuento.monto}% de descuento disponible hasta ${descuento.fecha_fin}!`,
        icon: 'assets/img/discount.png' // asegúrate de tener un ícono
      });
    }
  }
    
  
  verificarPermisosNotificaciones() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permiso => {
        if (permiso !== 'granted') {
          alert('⚠️ Habilita las notificaciones para ver los descuentos activos.');
        }
      });
    }
  }
  
  
  verificarFechasDescuentos() {
    const hoy = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  
    this.descuentos.forEach((descuento: any) => {
      const inicio = new Date(descuento.fecha_Inicio).toISOString().split('T')[0];
      const fin = new Date(descuento.fecha_fin).toISOString().split('T')[0];
  
      if (descuento.estado.toLowerCase() === 'activo') {
        if (inicio === hoy) {
          this.mostrarNotificacion(`🎉 Descuento activo: ${descuento.nombre}`, `Inicia hoy y termina el ${fin}`);
        }
  
        if (fin === hoy) {
          this.mostrarNotificacion(`⏳ Último día del descuento: ${descuento.nombre}`, `¡Aprovéchalo antes de que termine hoy!`);
        }
      }
    });
  }
  
  mostrarNotificacion(titulo: string, cuerpo: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(titulo, {
        body: cuerpo,
        icon: 'assets/img/campana.png' // Puedes cambiar a una imagen local o externa
      });
    }
  }
  
  
  cargarDescuentos() {
    this.descuentoService.getDescuentos().subscribe({
      next: (res) => this.descuentos = res,
      error: () => alert('❌ Error al cargar los descuentos')
    });
  }

  get descuentosFiltrados() {
    return this.descuentos.filter(d => {
      const termino = this.busqueda.toLowerCase();
      const coincideBusqueda = `${d.id} ${d.nombre} ${d.descripcion}`.toLowerCase().includes(termino);
      const coincideEstado = this.filtroEstado ? d.estado === this.filtroEstado : true;
      return coincideBusqueda && coincideEstado;
    });
  }

  eliminarDescuento(id: number) {
    if (confirm('¿Deseas eliminar este descuento?')) {
      this.descuentoService.eliminarDescuento(id).subscribe({
        next: () => this.descuentos = this.descuentos.filter(d => d.id !== id),
        error: () => alert('❌ Error al eliminar el descuento')
      });
    }
  }
} 