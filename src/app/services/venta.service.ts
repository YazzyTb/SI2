import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = `${environment.apiUrl}/ventas`;

  constructor(private http: HttpClient) {}

  // Obtener todas las ventas
  getVentas(): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Obtener una venta por ID
  getVentaById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Crear una nueva venta
  crearVenta(venta: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(this.apiUrl, venta, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Actualizar una venta existente
  actualizarVenta(id: number, venta: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(`${this.apiUrl}/${id}`, venta, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Eliminar una venta (o marcar como anulada)
  eliminarVenta(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
