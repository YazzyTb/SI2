import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent {
  searchTerm = '';
  filtroActivo = false;

  registros = [
    { nombre: 'Administrador', ip: '1.158.123', accion: 'inicio sesión', fecha: '11/04/2025', hora: '16:00' },
    { nombre: 'Juan Pérez', ip: '192.168.0.1', accion: 'modificó usuario', fecha: '10/04/2025', hora: '12:45' },
    { nombre: 'Laura Mendoza', ip: '192.168.0.15', accion: 'cerró sesión', fecha: '10/04/2025', hora: '18:10' }
  ];

  get registrosFiltrados() {
    let resultado = this.registros;

    if (this.searchTerm) {
      resultado = resultado.filter(reg =>
        reg.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reg.accion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reg.ip.includes(this.searchTerm)
      );
    }

    if (this.filtroActivo) {
      resultado = resultado.filter(reg => reg.accion.includes('inicio'));
    }

    return resultado;
  }
}