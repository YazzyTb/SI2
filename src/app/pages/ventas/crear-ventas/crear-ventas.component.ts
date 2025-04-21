import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { ProductoService } from '../../../services/producto.service';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { DescuentosService } from '../../../services/descuentos.service';
import { VentaService } from '../../../services/venta.service';
import { CarritoService } from '../../../services/carrito.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-ventas.component.html',
  styleUrls: ['./crear-ventas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,         // ✅ Asegúrate que está aquí
    RouterModule
  ],
})
export class CrearVentasComponent implements OnInit {

  venta: any = {
    cliente_id: null,
    metodo_pago_id: null,
    cupon_id: null,
    fecha: '',
    estado: 'confirmado'
  };

  carrito: any = {
    producto_id: null,
    cantidad: 1
  };

  clientes: any[] = [];
  productos: any[] = [];
  metodosPago: any[] = [];
  cupones: any[] = [];

  precioUnitario: number = 0;
  subtotal: number = 0;
  descuentoAplicado: number = 0;
  total: number = 0;

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private metodoPagoService: MetodoPagoService,
    private cuponService: DescuentosService,
    private ventaService: VentaService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.clienteService.getClientes().subscribe(data => this.clientes = data);
    this.productoService.getProductos().subscribe(data => this.productos = data);
    this.metodoPagoService.getMetodoPago().subscribe(data => this.metodosPago = data);
    this.cuponService.getDescuentos().subscribe(data => this.cupones = data);
  }

  actualizarPrecio() {
    const prod = this.productos.find(p => p.id === this.carrito.producto_id);
    if (prod) {
      this.precioUnitario = prod.precio;
    } else {
      this.precioUnitario = 0;
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.subtotal = this.precioUnitario * this.carrito.cantidad;

    const cupon = this.cupones.find(c => c.id === this.venta.cupon_id);
    this.descuentoAplicado = cupon ? cupon.monto : 0;

    this.total = this.subtotal - this.descuentoAplicado;
    if (this.total < 0) this.total = 0;
  }

  guardarVenta() {
    this.venta.fecha = new Date().toISOString().split('T')[0];
    this.venta.importe_total = this.total;

    this.ventaService.crearVenta(this.venta).subscribe({
      next: (res: any) => {
        const ventaId = res.id;

        const nuevoCarrito = {
          venta_id: ventaId,
          producto_id: this.carrito.producto_id,
          cantidad: this.carrito.cantidad
        };

        this.carritoService.agregarProducto(nuevoCarrito).subscribe(() => {
          alert('Venta registrada exitosamente');
          this.router.navigate(['/ventas']);
        });
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar la venta');
      }
    });
  }

  volver() {
    this.router.navigate(['/ventas']);
  }
}
