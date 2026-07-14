import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import type { Cliente } from '../../models/cliente.model';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  /** Se incrementa desde el padre cada vez que se agrega un cliente, para forzar recarga. */
  @Input() recargar = 0;

  clientes: Cliente[] = [];
  cargando = false;
  mensajeError = '';

  constructor(
      private clienteService: ClienteService,
      private router: Router
  ) {}  

  regresarMenu(): void {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
      console.log("Solicitando clientes...");

    this.cargando = true;
    this.mensajeError = '';

    try {
      this.clienteService.obtenerClientes().subscribe({
        next: (respuesta) => {
                console.log("Respuesta del backend:", respuesta);

          this.clientes = respuesta.clientes;
          this.cargando = false;
        },
        error: (error) => {
          this.cargando = false;
          this.mensajeError = 'No se pudo obtener la lista de clientes. Verifique que el servidor este activo.';
          console.error('[ClienteListComponent] Error al obtener clientes:', error);
        },
      });
    } catch (error) {
      this.cargando = false;
      this.mensajeError = 'Ocurrio un error inesperado al cargar los clientes.';
      console.error('[ClienteListComponent] Error en cargarClientes():', error);
    }
  }
}
