import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})
export class OrdenesService {

private httpClient = inject(HttpClient);
private apiUrl = 'http://localhost:3000/ordenes';

createOrden(data: any) {
    return this.httpClient.post(this.apiUrl, data);
}

getAllOrdenes() {
    return this.httpClient.get(this.apiUrl);
}
}