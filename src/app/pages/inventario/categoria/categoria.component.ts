import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any[] = [];
  nuevaCategoria = '';
  editando = false;
  categoriaEditando: any = null;

  constructor(private router: Router, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Error al obtener categorías:', err)
    });
  }

  agregarCategoria() {
    if (this.nuevaCategoria.trim()) {
      this.categoriaService.agregarCategoria(this.nuevaCategoria).subscribe({
        next: (res) => {
          this.categorias.push(res);
          this.nuevaCategoria = '';
        },
        error: (err) => console.error('Error al agregar categoría:', err)
      });
    }
  }

  iniciarEdicion(categoria: any) {
    this.editando = true;
    this.categoriaEditando = { ...categoria };
  }

  cancelarEdicion() {
    this.editando = false;
    this.categoriaEditando = null;
  }

  guardarEdicion() {
    this.categoriaService.editarCategoria(this.categoriaEditando.id, this.categoriaEditando.nombre).subscribe({
      next: (res) => {
        const index = this.categorias.findIndex(c => c.id === this.categoriaEditando.id);
        if (index !== -1) this.categorias[index] = res;
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al editar categoría:', err)
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(c => c.id !== id);
        },
        error: (err) => console.error('Error al eliminar categoría:', err)
      });
    }
  }

  volver() {
    this.router.navigate(['/inventario']);
  }
}
