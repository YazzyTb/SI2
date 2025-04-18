import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  filtro: string = '';
  orden: string = '';
  ascendente: boolean = true;

  productos = [
    {
      id: 1,
      nombre: 'Smartphone X1',
      stock: 20,
      stockMinimo: 5,
      stockMaximo: 100,
      precio: 1500,
      descripcion: 'Smartphone con pantalla OLED',
      categoria: 'Celulares',
      marca: 'MarcaTech',
      imagen: 'https://res.cloudinary.com/demo/image/upload/v1690000000/smartphone.png'
    },
    {
      id: 2,
      nombre: 'Cargador Rápido',
      stock: 50,
      stockMinimo: 10,
      stockMaximo: 200,
      precio: 100,
      descripcion: 'Cargador de carga rápida 3.0',
      categoria: 'Accesorios',
      marca: 'PowerUp',
      imagen: 'https://res.cloudinary.com/demo/image/upload/v1690000001/charger.png'
    }
  ];

  eliminarProducto(id: number) {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
    }
  }
  get productosFiltrados() {
    return this.productos
      .filter(p =>
        p.nombre.toLowerCase().includes(this.filtro.toLowerCase())
      )
      .sort((a, b) => {
        if (!this.orden) return 0;
  
        const campo = this.orden as keyof typeof a;
        const valorA = a[campo];
        const valorB = b[campo];
  
        if (typeof valorA === 'string') {
          return this.ascendente
            ? valorA.localeCompare(valorB as string)
            : (valorB as string).localeCompare(valorA);
        } else {
          return this.ascendente
            ? (valorA as number) - (valorB as number)
            : (valorB as number) - (valorA as number);
        }
      });
  }
  ordenarPor(campo: string) {
    if (this.orden === campo) {
      this.ascendente = !this.ascendente;
    } else {
      this.orden = campo;
      this.ascendente = true;
    }
  }

  flechaOrden(campo: string): string {
    if (this.orden === campo) {
      return this.ascendente ? '⬆️' : '⬇️';
    } else {
      return '↕️';
    }
  }
  
  
  
}
  
  
  
