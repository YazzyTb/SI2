import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BitacoraService } from '../../services/bitacora.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  searchTerm = '';
  filtroActivo = false;
  filtro = '';
  estadoFiltro = '';
  bitacora: any[] = [];
  usuarios: any[] = [];

  constructor(private BitacoraService: BitacoraService,
    private UsuarioService: UsuarioService) {}
    ngOnInit(): void {
      this.cargarRegistro();
      this.cargarUsuarios();
    }
  
    cargarRegistro() {
      this.BitacoraService.getBitacora().subscribe({
        next: (res) => this.bitacora = res,
        error: (err) => alert('No se puede cargar bitácora')
      });
    }
  
    cargarUsuarios() {
      this.UsuarioService.getUsuarios().subscribe({
        next: (res) => this.usuarios = res,
        error: (err) => alert('No se pueden cargar usuarios')
      });
    }
  
    obtenerNombreUsuario(usuarioId: number): string {
      if (!this.usuarios || this.usuarios.length === 0) return 'Cargando...';
      const usuario = this.usuarios.find(u => u.id === usuarioId);
      return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
    }
    
  
    get registrosFiltrados() {
      if (!this.usuarios || this.usuarios.length === 0) return this.bitacora;
    
      const termino = this.searchTerm.toLowerCase();
      return this.bitacora.filter(r => {
        const nombreUsuario = this.obtenerNombreUsuario(r.usuario_id).toLowerCase();
        const coincideBusqueda = `${nombreUsuario} ${r.ip} ${r.accion} ${r.fecha} ${r.hora}`.includes(termino);
        return this.filtroActivo
          ? r.accion.toLowerCase().includes('inicio de sesión') && coincideBusqueda
          : coincideBusqueda;
      });
    }
    
    // Paginación
  paginaActual = 1;
  itemsPorPagina = 5;

  get bitacoraPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.registrosFiltrados.slice(inicio, inicio + this.itemsPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.registrosFiltrados.length / this.itemsPorPagina);
  }

  cambiarPagina(direccion: number) {
    const nueva = this.paginaActual + direccion;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
    }
  }

}