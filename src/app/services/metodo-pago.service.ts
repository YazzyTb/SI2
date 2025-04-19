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
    getMetodos(): Observable<any[]> {
      const token = localStorage.getItem('token');
      return this.http.get<any[]>(`${this.apiUrl}/metodos_pago`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
}
