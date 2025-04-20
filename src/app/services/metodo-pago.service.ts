import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
    getMetodoPago(): Observable<any[]> {
      const token = localStorage.getItem('token');
      return this.http.get<any[]>(`${this.apiUrl}/metodos_pago`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
  agregarMetodoPago(nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/metodos_pago`, { nombre }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }  

  editarMetodoPago(id: number, nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/metodos_pago/${id}`, { nombre }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  crearMetodoPago(metodo: { nombre: string }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/metodos_pago`, metodo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getMetodoPagoById(id: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${this.apiUrl}/metodos_pago/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  actualizarMetodoPago(id: number, metodo: any) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/metodos_pago/${id}`, metodo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  eliminarMetodoPago(id: number) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/metodos_pago/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
