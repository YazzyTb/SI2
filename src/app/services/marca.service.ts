import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMarcas() {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/marcas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }  

  agregarMarca(nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/marcas`, { nombre }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }  

  editarMarca(id: number, nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/marcas/${id}`, { nombre }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  eliminarMarca(id: number) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/marcas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
