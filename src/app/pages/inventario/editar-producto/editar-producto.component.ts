import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { MarcaService } from '../../../services/marca.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: any = {
    nombre: '',
    stock: 0,
    stock_minimo: 0,
    stock_maximo: 0,
    precio: 0,
    descripcion: '',
    categoria: '',
    marca: '',
    imagenes: [] as File[]
  };

  imagenPreviews: string[] = [];
  imagenesExistentes: any[] = [];
  categorias: any[] = [];
  marcas: any[] = [];
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.categoriaService.getCategorias().subscribe({
      next: res => this.categorias = res
    });
  
    this.marcaService.getMarcas().subscribe({
      next: res => this.marcas = res
    });
  
    this.productoService.getProductoById(this.id).subscribe({
      next: (res) => {
        console.log('🟢 Producto recibido:', res); // 👉 Verifica en consola
        this.producto = {
          ...res,
          categoria: res.categoria_id,
          marca: res.marca_id,
          imagenes: [] // vaciar nuevas imágenes a subir
        };
  
        if (res.imagenes && Array.isArray(res.imagenes)) {
          this.imagenesExistentes = res.imagenes;
        }
      },
      error: err => {
        console.error('❌ Error al cargar producto:', err);
        alert('Error al cargar el producto');
      }
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

  eliminarImagenExistente(id: number) {
    this.productoService.eliminarImagenProducto(id).subscribe({
      next: () => {
        this.imagenesExistentes = this.imagenesExistentes.filter(img => img.id !== id);
      },
      error: () => {
        alert('❌ Error al eliminar la imagen');
      }
    });
  }
  
  

  eliminarImagenNueva(index: number) {
    this.producto.imagenes.splice(index, 1);
    this.imagenPreviews.splice(index, 1);
  }

  actualizarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('precio', this.producto.precio.toString());
    formData.append('stock', this.producto.stock.toString());
    formData.append('stock_minimo', this.producto.stock_minimo.toString());
    formData.append('stock_maximo', this.producto.stock_maximo.toString());
    formData.append('descripcion', this.producto.descripcion);
    formData.append('categoria_id', this.producto.categoria.toString());
    formData.append('marca_id', this.producto.marca.toString());
  
    // Agregar imágenes nuevas
    this.producto.imagenes.forEach((file: File) => {
      formData.append('imagenes', file); // OJO: el nombre debe coincidir con el backend
    });
  
    this.productoService.actualizarProducto(this.id, formData).subscribe({
      next: () => {
        alert('✅ Producto actualizado correctamente');
        this.router.navigate(['/inventario']);
      },
      error: (err) => {
        console.error('❌ Error al actualizar producto:', err);
        alert('❌ Error del servidor al actualizar producto');
      }
    });
  }
  
  volver() {
    this.router.navigate(['/inventario']);
  }
}
