import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EjecutadosService } from '../../../services/ejecutados';
import { ChangeDetectorRef } from '@angular/core';
import { OrdenesService } from '../../../services/ordenes';

@Component({
selector: 'app-estadisticas',
standalone: true,
imports: [CommonModule],
templateUrl: './estadisticas.html',
styleUrl: './estadisticas.css',
})
export class Estadisticas implements OnInit {
private ejecutadosService = inject(EjecutadosService);
private cdr = inject(ChangeDetectorRef);
private ordenesService = inject(OrdenesService);

ejecutados: any[] = [];

totalIntervenciones: number = 0;
estadisticasMaquinas: any[] = [];
estadisticasHornos: any[] = [];
estadisticasMecanicos: any[] = [];
maquinasCriticas: any[] = [];

ngOnInit(): void {
    this.ejecutadosService.getAllEjecutados().subscribe((res: any) => {
    this.ejecutados = res.data || res;
    this.totalIntervenciones = this.ejecutados.length;

    this.calcularEstadisticas();

      this.cdr.detectChanges(); // 🔥 ESTO ARREGLA EL DOBLE CLICK
    });
}

calcularEstadisticas() {
    const conteoMaquinas: any = {};
    const conteoHornos: any = {};
    const conteoMecanicos: any = {};

    this.ejecutados.forEach((ejecutado: any) => {
    const maquina = ejecutado.maquina || 'Sin máquina';
    const horno = ejecutado.horno || 'Sin horno';
    const mecanico = ejecutado.name || 'Sin mecánico';

    conteoMaquinas[maquina] = (conteoMaquinas[maquina] || 0) + 1;
    conteoHornos[horno] = (conteoHornos[horno] || 0) + 1;
    conteoMecanicos[mecanico] = (conteoMecanicos[mecanico] || 0) + 1;
    });

    this.estadisticasMaquinas = Object.entries(conteoMaquinas).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
    }));

    this.estadisticasHornos = Object.entries(conteoHornos).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
    }));

    this.estadisticasMecanicos = Object.entries(conteoMecanicos).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
    }));

    this.estadisticasMaquinas.sort((a, b) => b.cantidad - a.cantidad);
    this.estadisticasHornos.sort((a, b) => b.cantidad - a.cantidad);
    this.estadisticasMecanicos.sort((a, b) => b.cantidad - a.cantidad);
    this.maquinasCriticas = this.estadisticasMaquinas.filter(
        (m) => m.cantidad >= 3);
}
generarOrden(maquina: string) {
    const nuevaOrden = {
    tipo: 'PM01',
    maquina: maquina,
    actividad: 'Revisión por falla repetitiva',
    tiempoEstimado: 60,
    estado: 'pendiente'
    };

    this.ordenesService.createOrden(nuevaOrden).subscribe({
    next: (res) => {
        console.log('Orden guardada en Mongo:', res);
        alert(`Orden generada para ${maquina}`);
    },
    error: (err) => {
        console.error('Error al guardar la orden:', err);
        alert('No se pudo guardar la orden');
    }
    });
}
}
