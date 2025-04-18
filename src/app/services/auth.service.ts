import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(gmail: string, contrasena: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { gmail, contrasena });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }
}
