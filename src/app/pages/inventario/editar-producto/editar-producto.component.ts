import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  categorias = ['Celulares', 'Accesorios', 'Cargadores'];
  marcas = ['MarcaTech', 'PowerUp', 'QuickCharge'];

  producto = {
    id: '',
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.producto.id = id ?? '';

    // Aquí puedes cargar los datos reales desde el backend
    // Por ahora datos mock de prueba:
    this.producto = {
      id: id ?? '',
      nombre: 'Producto de prueba',
      stock: 10,
      stockMinimo: 3,
      stockMaximo: 20,
      precio: 200,
      descripcion: 'Descripción de prueba',
      categoria: 'Celulares',
      marca: 'MarcaTech',
      imagenes: []
    };

    // Vista previa simulada:
    this.imagenPreviews = [
      'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    ];
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
        if (reader.result) this.imagenPreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagen(index: number) {
    this.producto.imagenes.splice(index, 1);
    this.imagenPreviews.splice(index, 1);
  }

  actualizarProducto() {
    console.log('Producto actualizado:', this.producto);
    this.router.navigate(['/inventario']);
  }

  volver() {
    this.router.navigate(['/inventario']);
  }
}
