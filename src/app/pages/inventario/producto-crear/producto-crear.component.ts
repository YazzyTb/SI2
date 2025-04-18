import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent {
  categorias = ['Celulares', 'Accesorios', 'Cargadores'];
  marcas = ['MarcaTech', 'PowerUp', 'QuickCharge'];

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

  constructor(private router: Router) {}


  abrirInput() {
    const input = document.querySelector('input[type=\"file\"]') as HTMLElement;
    input.click();
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.procesarArchivos(files);
    }
  }
  
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.procesarArchivos(files);
    }
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
    console.log('Producto guardado:', this.producto);
    this.router.navigate(['/inventario']);
  }

  volver() {
    this.router.navigate(['/inventario']);
  }
}