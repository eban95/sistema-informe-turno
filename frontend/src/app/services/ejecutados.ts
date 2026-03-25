import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class EjecutadosService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/ejecutados';

  getallEjecutados() {
    return this.httpClient.get(this.apiUrl);
  }
  createEjecutado(data: any) {
    return this.httpClient.post(this.apiUrl, data);
  }
  updateEjecutado(id: string, data: any) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }
  deleteEjecutado(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
