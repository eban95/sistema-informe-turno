import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { EjecutadosService } from '../../../services/ejecutados';

@Component({
  selector: 'app-ejecutados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ejecutados.html',
  styleUrl: './ejecutados.css',
})
export class Ejecutados implements OnInit {
  private EjecutadosService = inject(EjecutadosService);
  private cdr = inject(ChangeDetectorRef);

  ejecutados: any[] = [];

  ejecutadoEditando: any = null;
  editName: string = '';
  editMaquina: string = '';
  editArea: string = '';
  editComentarios: string = '';
  editTiempo: number | null = null;

  ejecutadoSeleccionado: any = null;

  ngOnInit(): void {
    this.cargarEjecutados();
  }

  cargarEjecutados() {
    this.EjecutadosService.getAllEjecutados().subscribe((res: any) => {
      this.ejecutados = res.data || res;
      console.log('ejecutados', this.ejecutados);
      this.cdr.detectChanges();
    });
  }

  verEjecutado(ejecutado: any) {
    this.ejecutadoSeleccionado = ejecutado;
  }

  editarEjecutado(ejecutado: any) {
    this.ejecutadoEditando = ejecutado;
  
    this.editName = ejecutado.name;
    this.editMaquina = ejecutado.maquina;
    this.editArea = ejecutado.area;
    this.editComentarios = ejecutado.comentarios;
    this.editTiempo = ejecutado.tiempo;
  }

  eliminarEjecutado(id: string) {
    const confirmar = confirm('¿Seguro que deseas eliminar este registro?');
  
    if (!confirmar) {
      return;
    }
    this.EjecutadosService.deleteEjecutado(id).subscribe({
    next: (res) => {
    console.log('Eliminado:', res);
      this.cargarEjecutados();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      }
    });  
  }
  guardarCambios() {
    if (!this.ejecutadoEditando) {
      return;
    }
  
    const datosActualizados = {
      name: this.editName,
      maquina: this.editMaquina,
      area: this.editArea,
      comentarios: this.editComentarios,
      tiempo: this.editTiempo
    };
  
    this.EjecutadosService.updateEjecutado(this.ejecutadoEditando._id, datosActualizados)
      .subscribe({
        next: (res) => {
          console.log('Actualizado:', res);
          this.ejecutadoEditando = null;
          this.cargarEjecutados();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
        }
      });
  }
  listaMecanicos: string [] = ['carlos largo','pedro almanza','luis cepeda','alexis torres','yeison puentes','fernando pachon','javier hernandez','duvan moreno','jholman hernandez','jorge cardenas'];
  listaMaquinas: string [] = ['Emmeti 1','Emetti 2','Emetti 3','Oms 1','Oms 2','allianz 1','allianz 2','Oms 5','Oms 6','Emmeti 10','Emmeti 11','Emmeti 12','Emmeti 13','Emmeti 14','Emmeti 15','Ems 1','Ems 2','Ems 3','Linea de flejado 0','Linea de fjeado 1','Linea de flejado 2','linea de flejado 3','linea de flejado 101','linea de flejado 102','Flejadora 0','Flejadora 1','Flejadora 2','Flejadora 3','Flejadora 4','Flejadora 5','Flejadora 6','Flejadora 101','Flejadora 102','Envolvedora 0','Envolvedora 1','Envolvedora 2','Envolvedora 3','Envolvedora 101','Envolvedora 102','Transfercar 10','Transfercar 20','Transfercar 30','Transfercar 40','Manejos y transporte B1','Manejos y transporte B2','Manejos y transporte B3','Manejos y transporte D0','Manejos y transporte D1','Manejos y transporte D2','Manejos y transporte D3','Manejos y transporte E1','Manejos y transporte E2','Manejos y transporte E3','Manejos y transporte E4','Manejos y transporte F1','Manejos y transporte F2','Manejos y transporte F3'];
  listaHornos: string[] = ['Horno B', 'Horno D', 'Horno E', 'Horno F'];
  
    filtroMecanico: string = '';
    filtroMaquina: string = '';
    filtroHorno: string = '';
    filtroComentario: string = '';

    get ejecutadosFiltrados() {
      return this.ejecutados.filter((ejecutado: any) => {
        const coincideMecanico =
          !this.filtroMecanico || ejecutado.name === this.filtroMecanico;
    
        const coincideMaquina =
          !this.filtroMaquina || ejecutado.maquina === this.filtroMaquina;
    
        const coincideHorno =
          !this.filtroHorno || ejecutado.horno === this.filtroHorno;
    
        return coincideMecanico && coincideMaquina && coincideHorno;
      });
    }
    }

