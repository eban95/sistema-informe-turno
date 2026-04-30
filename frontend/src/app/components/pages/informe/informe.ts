import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EjecutadosService } from '../../../services/ejecutados';

@Component({
selector: 'app-informe',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './informe.html',
styleUrl: './informe.css',
})
export class Informe  implements OnInit {

private ejecutadosService = inject(EjecutadosService);

codigoIngresado: string = '';
accesoPermitido: boolean = false;
mensajeError: string = '';

listaMecanicosA: string [] = ['carlos largo','pedro almanza','luis cepeda','jorge cardenas'];
listaMecanicosB: string [] = ['alexis torres','yeison puentes','fernando pachon'];
listaMecanicosC: string [] = ['javier hernandez','duvan moreno','jholman hernandez','jorge cardenas'];
listaMaquinas: string [] = ['Emmeti 1','Emetti 2','Emetti 3','Oms 1','Oms 2','allianz 1','allianz 2','Oms 5','Oms 6','Emmeti 10','Emmeti 11','Emmeti 12','Emmeti 13','Emmeti 14','Emmeti 15','Ems 1','Ems 2','Ems 3','Linea de flejado 0','Linea de fjeado 1','Linea de flejado 2','linea de flejado 3','linea de flejado 101','linea de flejado 102','Flejadora 0','Flejadora 1','Flejadora 2','Flejadora 3','Flejadora 4','Flejadora 5','Flejadora 6','Flejadora 101','Flejadora 102','Envolvedora 0','Envolvedora 1','Envolvedora 2','Envolvedora 3','Envolvedora 101','Envolvedora 102','Transfercar 10','Transfercar 20','Transfercar 30','Transfercar 40','Manejos y transporte B1','Manejos y transporte B2','Manejos y transporte B3','Manejos y transporte D0','Manejos y transporte D1','Manejos y transporte D2','Manejos y transporte D3','Manejos y transporte E1','Manejos y transporte E2','Manejos y transporte E3','Manejos y transporte E4','Manejos y transporte F1','Manejos y transporte F2','Manejos y transporte F3'];
listaHornos: string [] = ['Horno B','Horno D','Horno E','Horno F'];

listaMecanicos: string[] = [];

mecanico: string = '';
maquina: string = '';
horno: string = '';
area: string = '';
comentarios: string = '';
tiempo: number | null = null;
turno: string = '';

intervenciones: any[] = [];

ngOnInit() {
    const acceso = localStorage.getItem('accesoInforme');
    const expiracion = localStorage.getItem('expiracionInforme');
    const intervencionesGuardadas = localStorage.getItem('intervencionesTurno');

    if (intervencionesGuardadas) {
    this.intervenciones = JSON.parse(intervencionesGuardadas);
    }
    if (acceso === 'true' && expiracion) {
    const ahora = Date.now();
    if (ahora < Number(expiracion)) {
        this.accesoPermitido = true;
    } else {
        localStorage.removeItem('accesoInforme');
        localStorage.removeItem('expiracionInforme');
    }
    }

    const turnoGuardado = localStorage.getItem('turnoInforme');

    if (turnoGuardado) {
        this.turno = turnoGuardado;
        if (this.turno === 'A') {
        this.listaMecanicos = this.listaMecanicosA;
        } else if (this.turno === 'B') {
        this.listaMecanicos = this.listaMecanicosB;
        } else if (this.turno === 'C') {
        this.listaMecanicos = this.listaMecanicosC;
        }
    }
    if (intervencionesGuardadas) {
    this.intervenciones = JSON.parse(intervencionesGuardadas);
    }

}

validarCodigo() {
    if (this.codigoIngresado === '1234') {
    this.accesoPermitido = true;
    this.mensajeError = '';
    this.turno = 'A';
    this.listaMecanicos = this.listaMecanicosA;
    } else if (this.codigoIngresado === '4567') {
    this.accesoPermitido = true;
    this.mensajeError = '';
    this.turno = 'B';
    this.listaMecanicos = this.listaMecanicosB;
    } else if (this.codigoIngresado === '7890') {
    this.accesoPermitido = true;
    this.mensajeError = '';
    this.turno = 'C';
    this.listaMecanicos = this.listaMecanicosC;
    } else {
    this.accesoPermitido = false;
    this.mensajeError = 'Código incorrecto';
    return;
    }
    const tiempoExpiracion = Date.now() + (8 * 60 * 60 * 1000);
    localStorage.setItem('accesoInforme', 'true');
    localStorage.setItem('expiracionInforme', tiempoExpiracion.toString());
    localStorage.setItem('turnoInforme', this.turno);
}

agregarIntervencion() {
    if (
    !this.mecanico.trim() ||
    !this.maquina.trim() ||
    !this.horno.trim() ||
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
    horno: this.horno,
    area: this.area,
    comentarios: this.comentarios,
    tiempo: this.tiempo
    };

    this.intervenciones.push(nuevaIntervencion);
    localStorage.setItem('intervencionesTurno', JSON.stringify(this.intervenciones));

    console.log('Intervenciones del turno:', this.intervenciones);

    this.mecanico = '';
    this.maquina = '';
    this.horno = '';
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
    localStorage.removeItem('intervencionesTurno');
}
cerrarTurno() {
    localStorage.removeItem('accesoInforme');
    localStorage.removeItem('expiracionInforme');
    localStorage.removeItem('intervencionesTurno');
    localStorage.removeItem('turnoInforme');
    this.accesoPermitido = false;
    this.codigoIngresado = '';
    this.intervenciones = [];
    this.listaMecanicos = [];
    alert('Turno cerrado correctamente');
}

}