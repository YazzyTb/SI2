import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-producto-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent implements OnInit {
  categorias: any[] = [];
  marcas: any[] = [];

  producto = {
    nombre: '',
    stock: 0,
    stockMinimo: 0,
    stockMaximo: 0,
    precio: 0,
    descripcion: '',
    categoria: '', // texto: el backend se encarga de convertir a ID
    marca: '',     // texto: el backend se encarga de convertir a ID
    imagenes: [] as File[]
  };

  imagenPreviews: string[] = [];

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('❌ Error al cargar categorías', err)
    });

    this.marcaService.getMarcas().subscribe({
      next: (res) => this.marcas = res,
      error: (err) => console.error('❌ Error al cargar marcas', err)
    });
  }

  abrirInput() {
    const input = document.querySelector('input[type="file"]') as HTMLElement;
    input.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) this.procesarArchivos(files);
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) this.procesarArchivos(files);
  }

  procesarArchivos(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.producto.imagenes.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagenPreviews.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagen(index: number) {
    this.producto.imagenes.splice(index, 1);
    this.imagenPreviews.splice(index, 1);
  }

  guardarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('stock', this.producto.stock.toString());
    formData.append('stock_minimo', this.producto.stockMinimo.toString());
    formData.append('stock_maximo', this.producto.stockMaximo.toString());
    formData.append('precio', this.producto.precio.toString());
    formData.append('descripcion', this.producto.descripcion);
    formData.append('categoria_id', this.producto.categoria);  // ← este es el cambio importante
    formData.append('marca_id', this.producto.marca);          // ← este también
  
    this.producto.imagenes.forEach((img) => {
      formData.append('imagenes', img);
    });
  
    this.productoService.crearProducto(formData).subscribe({
      next: () => {
        alert('✅ Producto creado con éxito');
        this.router.navigate(['/inventario']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        alert('❌ Error del servidor: ' + err.error?.error || 'No se pudo crear el producto');
      }
    });
  }
  
  

  volver() {
    this.router.navigate(['/inventario']);
  }
}
