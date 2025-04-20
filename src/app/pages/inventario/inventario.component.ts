import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ClienteService } from '../../services/cliente.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  filtro: string = '';
  productos: any[] = [];
  clientes: any[] = [];
  categorias: any[] = [];
  marcas: any[] = [];
  paginaActual: number = 1;
  itemsPorPagina: number = 5;

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.productoService.getProductos().subscribe({
      next: (res) => this.productos = res,
      error: () => alert('Error al cargar productos')
    });
    this.clienteService.getClientes().subscribe({
      next: (res) => this.clientes = res,
      error: () => alert('Error al cargar clientes')
    });
    this.categoriaService.getCategorias().subscribe({
      next: (res) => this.categorias = res,
      error: () => alert('Error al cargar categorías')
    });
    this.marcaService.getMarcas().subscribe({
      next: (res) => this.marcas = res,
      error: () => alert('Error al cargar marcas')
    });
  }

  imagenError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/img/no-image.png';
  }

  eliminarProducto(id: number) {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p.id !== id);
          alert('Producto eliminado con éxito');
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          alert('No se pudo eliminar el producto.');
        }
      });
    }
  }
  

  obtenerNombreCliente(id: number): string {
    const cliente = this.clientes.find(c => c.id === id);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido';
  }

  obtenerNombreMarca(id: number): string {
    const marca = this.marcas.find(m => m.id === id);
    return marca ? marca.nombre : 'Sin marca';
  }

  obtenerNombreCategoria(id: number): string {
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  get productosFiltrados() {
    return this.productos.filter(p =>
      (p.nombre + p.descripcion).toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  get productosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.productosFiltrados.slice(inicio, inicio + this.itemsPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.productosFiltrados.length / this.itemsPorPagina);
  }

  cambiarPagina(direccion: number) {
    const nueva = this.paginaActual + direccion;
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
    }
  }

  
}
