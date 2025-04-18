import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategorias() {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/categorias`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  agregarCategoria(nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/categorias`, { nombre },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  editarCategoria(id: number, nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/categorias/${id}`, { nombre },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  eliminarCategoria(id: number) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/categorias/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
