import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/clientes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  agregarCliente(nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/clientes`, { nombre }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } 

  crearCliente(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  actualizarCliente(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
