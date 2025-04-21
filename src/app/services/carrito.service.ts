import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener todos los carritos
  getCarritos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un carrito específico por venta y producto
  getCarrito(venta_id: number, producto_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${venta_id}/${producto_id}`);
  }

  // Agregar un producto al carrito (POST)
  agregarProducto(carrito: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, carrito);
  }

  // Actualizar un producto del carrito
  actualizarProducto(venta_id: number, producto_id: number, carritoActualizado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${venta_id}/${producto_id}`, carritoActualizado);
  }

  // Eliminar un producto del carrito
  eliminarProducto(venta_id: number, producto_id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${venta_id}/${producto_id}`);
  }
}
