import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EjecutadosService {
  private httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://54.82.154.210/ejecutados';
  

  getAllEjecutados() {
    return this.httpClient.get(this.apiUrl);
  }
  createEjecutado(data: unknown) {
    return this.httpClient.post(this.apiUrl, data);
  }
  updateEjecutado(id: string, data: unknown) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }
  deleteEjecutado(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
