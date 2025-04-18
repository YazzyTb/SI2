import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsuarios() {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  buscarPorNombre(nombre: string) {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${nombre}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  buscarPorRol(nombreRol: string) {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/rol/${nombreRol}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  eliminarUsuario(codigo: number) {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/usuarios/${codigo}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getUsuario(id: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  crearUsuario(data: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/usuarios`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  editarUsuario(codigo: number, data: any) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/usuarios/${codigo}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  obtenerRoles() {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.apiUrl}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  validarCorreo(gmail: string) {
    return this.http.post<{ existe: boolean }>(`${this.apiUrl}/usuarios/validar-correo`, { gmail });
  }
  
}
