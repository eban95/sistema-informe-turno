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
    this.EjecutadosService.getallEjecutados().subscribe((res: any) => {
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
}