import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent implements OnInit {
  marcas: any[] = [];
  nuevamarca: string = '';

  editando = false;
  marcaEditando: any = null;

  constructor(
    private router: Router,
    private marcaService: MarcaService
  ) {}

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas() {
    this.marcaService.getMarcas().subscribe({
      next: (res) => {
        this.marcas = res;
      },
      error: (err) => {
        console.error('Error al obtener marcas:', err);
        alert('Error al obtener las marcas.');
      }
    });
  }

  agregarMarca() {
    if (this.nuevamarca.trim()) {
      this.marcaService.agregarMarca(this.nuevamarca).subscribe({
        next: (res) => {
          this.marcas.push(res);
          this.nuevamarca = '';
        },
        error: (err) => {
          console.error('Error al agregar marca:', err);
          alert('Error al agregar marca.');
        }
      });
    }
  }

  iniciarEdicion(marca: any) {
    this.editando = true;
    this.marcaEditando = { ...marca };
  }

  cancelarEdicion() {
    this.editando = false;
    this.marcaEditando = null;
  }

  guardarEdicion() {
    this.marcaService.editarMarca(this.marcaEditando.id, this.marcaEditando.nombre).subscribe({
      next: (res) => {
        const index = this.marcas.findIndex(m => m.id === this.marcaEditando.id);
        if (index !== -1) {
          this.marcas[index] = res;
        }
        this.cancelarEdicion();
      },
      error: (err) => {
        console.error('Error al editar marca:', err);
        alert('Error al guardar los cambios.');
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro que quieres eliminar esta marca?')) {
      this.marcaService.eliminarMarca(id).subscribe({
        next: () => {
          this.marcas = this.marcas.filter(m => m.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar marca:', err);
          alert('No se pudo eliminar la marca.');
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/inventario']);
  }
}
