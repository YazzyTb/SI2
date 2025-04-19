import { Component } from '@angular/core';
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
export class ProductoCrearComponent {
  categorias:any = [];
  marcas: any = [];


  producto = {
    nombre: '',
    stock: 0,
    stockMinimo: 0,
    stockMaximo: 0,
    precio: 0,
    descripcion: '',
    categoria: '',
    marca: '',
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
      error: (err) => console.error('Error al cargar categorías', err)
    });
  
    this.marcaService.getMarcas().subscribe({
      next: (res) => this.marcas = res,
      error: (err) => console.error('Error al cargar marcas', err)
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
    formData.append('stockMinimo', this.producto.stockMinimo.toString());
    formData.append('stockMaximo', this.producto.stockMaximo.toString());
    formData.append('precio', this.producto.precio.toString());
    formData.append('descripcion', this.producto.descripcion);
    formData.append('categoria', this.producto.categoria);
    formData.append('marca', this.producto.marca);

    this.producto.imagenes.forEach((img, index) => {
      formData.append('imagenes', img);
    });

    this.productoService.crearProducto(formData).subscribe({
      next: () => {
        alert('✅ Producto creado con éxito');
        this.router.navigate(['/inventario']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        alert('❌ Error al crear el producto');
      }
    });
  }

  volver() {
    this.router.navigate(['/inventario']);
  }
}
