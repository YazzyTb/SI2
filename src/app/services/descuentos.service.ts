import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescuentosService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

    getDescuentos() {
        const token = localStorage.getItem('token');
        return this.http.get<any[]>(`${this.apiUrl}/cupones`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      
    agregarDescuento(nombre: string) {
      const token = localStorage.getItem('token');
      return this.http.post(`${this.apiUrl}/cupones`, { nombre }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }  
  
    editarDescuento(id: number, nombre: string) {
      const token = localStorage.getItem('token');
      return this.http.put(`${this.apiUrl}/cupones/${id}`, { nombre }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    crearDescuento(metodo: { nombre: string }): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.post(`${this.apiUrl}/cupones`, metodo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  
    getDescuentoById(id: number) {
      const token = localStorage.getItem('token');
      return this.http.get<any>(`${this.apiUrl}/cupones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    actualizarDescuento(id: number, metodo: any) {
      const token = localStorage.getItem('token');
      return this.http.put(`${this.apiUrl}/cupones/${id}`, metodo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    eliminarDescuento(id: number) {
      const token = localStorage.getItem('token');
      return this.http.delete(`${this.apiUrl}/cupones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  
}
