import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {
  clienteId: number = 0;
  cliente = { nombre: '', apellido: '', telefono: '', nit: '', gmail: '', estado: 'activo' };

  clientesMock = [
    { id: 1, nombre: 'Carlos', apellido: 'González', telefono: '71234567', nit: '12345678', gmail: 'carlos@gmail.com', estado: 'activo' },
    { id: 2, nombre: 'Lucía', apellido: 'Mamani', telefono: '72345678', nit: '', gmail: 'lucia@gmail.com', estado: 'inactivo' },
    { id: 3, nombre: 'Diego', apellido: 'Rivera', telefono: '73456789', nit: '87654321', gmail: 'diego@gmail.com', estado: 'activo' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    const encontrado = this.clientesMock.find(c => c.id === this.clienteId);
    if (encontrado) {
      this.cliente = { ...encontrado };
    }
  }

  guardarCambios() {
    alert('Cliente actualizado (simulado)');
    this.router.navigate(['/clientes']);
  }

  volver() {
    this.router.navigate(['/clientes']);
  }
}
