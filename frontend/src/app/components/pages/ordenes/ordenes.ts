import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesService } from '../../../services/ordenes';

@Component({
selector: 'app-ordenes',
standalone: true,
imports: [CommonModule],
templateUrl: './ordenes.html',
styleUrl: './ordenes.css'
})
export class Ordenes implements OnInit {

private ordenesService = inject(OrdenesService);

ordenes: any[] = [];

ngOnInit(): void {
    this.cargarOrdenes();
}

cargarOrdenes() {
    this.ordenesService.getAllOrdenes().subscribe((res: any) => {
    this.ordenes = res.data || res;
    });
}
}