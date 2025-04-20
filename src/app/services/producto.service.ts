import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Obtener todos los productos
  getProductos(): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Crear producto
  crearProducto(productoData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, productoData, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  eliminarImagenProducto(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`https://back-ecommerce-xot1.onrender.com/imagenes_producto/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  

  // Obtener por ID
  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar producto
  actualizarProducto(id: number, data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
}
