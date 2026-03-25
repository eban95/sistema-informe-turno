import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EjecutadosService } from '../../../services/ejecutados';

@Component({
selector: 'app-informe',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './informe.html',
styleUrl: './informe.css',
})
export class Informe {

private ejecutadosService = inject(EjecutadosService);

codigoIngresado: string = '';
accesoPermitido: boolean = false;
mensajeError: string = '';

mecanico: string = '';
maquina: string = '';
area: string = '';
comentarios: string = '';
tiempo: number | null = null;

intervenciones: any[] = [];

validarCodigo() {
    const codigoCorrecto = '1234';

    if (this.codigoIngresado === codigoCorrecto) {
    this.accesoPermitido = true;
    this.mensajeError = '';
    } else {
    this.accesoPermitido = false;
    this.mensajeError = 'Código incorrecto';
    }
}

agregarIntervencion() {
    if (
    !this.mecanico.trim() ||
    !this.maquina.trim() ||
    !this.area.trim() ||
    !this.comentarios.trim() ||
    this.tiempo === null
    ) {
    alert('Debes completar todos los campos antes de agregar la intervención');
    return;
    }

    const nuevaIntervencion = {
    name: this.mecanico,
    maquina: this.maquina,
    area: this.area,
    comentarios: this.comentarios,
    tiempo: this.tiempo
    };

    this.intervenciones.push(nuevaIntervencion);

    console.log('Intervenciones del turno:', this.intervenciones);

    this.mecanico = '';
    this.maquina = '';
    this.area = '';
    this.comentarios = '';
    this.tiempo = null;
}

guardarTurno() {
    if (this.intervenciones.length === 0) {
    alert('No hay intervenciones para guardar');
    return;
    }

    this.intervenciones.forEach((intervencion) => {
    this.ejecutadosService.createEjecutado(intervencion)
        .subscribe({
        next: (res) => {
            console.log('Guardado:', res);
        },
        error: (err) => {
            console.error('Error:', err);
        }
        });
    });

    alert('Turno guardado correctamente');
    this.intervenciones = [];
}

}