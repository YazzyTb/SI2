import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-detalles.component.html',
  styleUrls: ['./cliente-detalles.component.css']
})
export class ClienteDetallesComponent {
  clienteId: number = 0;
  cliente: any;

  clientesMock = [
    { id: 1, nombre: 'Carlos', apellido: 'González', telefono: '71234567', nit: '12345678', gmail: 'carlos@gmail.com', estado: 'activo' },
    { id: 2, nombre: 'Lucía', apellido: 'Mamani', telefono: '72345678', nit: '', gmail: 'lucia@gmail.com', estado: 'inactivo' },
    { id: 3, nombre: 'Diego', apellido: 'Rivera', telefono: '73456789', nit: '87654321', gmail: 'diego@gmail.com', estado: 'activo' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.cliente = this.clientesMock.find(c => c.id === this.clienteId);
  }

  volver() {
    this.router.navigate(['/clientes']);
  }
}
