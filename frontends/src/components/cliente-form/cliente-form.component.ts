import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import type { Cliente } from '../../models/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent {
  @Output() clienteAgregado = new EventEmitter<void>();

  formulario: FormGroup;
  enviando = false;
  mensajeError = '';
  erroresServidor: string[] = [];

  constructor(
      private formBuilder: FormBuilder,
      private clienteService: ClienteService,
      private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      codigoCliente: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      nombreCliente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccionCliente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      telefonoCliente: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{7,20}$/)]],
    });
  }

  regresarMenu(): void {
    this.router.navigate(['/']);
  }
  get codigoCliente() {
    return this.formulario.get('codigoCliente');
  }
  get nombreCliente() {
    return this.formulario.get('nombreCliente');
  }
  get direccionCliente() {
    return this.formulario.get('direccionCliente');
  }
  get telefonoCliente() {
    return this.formulario.get('telefonoCliente');
  }

  agregar(): void {
      console.log('Entró al método agregar');

    this.mensajeError = '';
    this.erroresServidor = [];

    console.log(this.formulario.value);
    console.log(this.formulario.valid);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.value;
    const cliente: Cliente = {
      codigoCliente: valores.codigoCliente.trim(),
      nombreCliente: valores.nombreCliente.trim(),
      direccionCliente: valores.direccionCliente.trim(),
      telefonoCliente: valores.telefonoCliente.trim(),
    };

    console.log(cliente);
    this.enviando = true;

    console.log("Enviando al backend...");
    try {
      console.log("Enviando al baaaackend...");
      this.clienteService.agregarCliente(cliente).subscribe({
        next: (respuesta) => {

          console.log("Cliente guardado correctamente.", respuesta);

          this.enviando = false;

          this.formulario.reset();

          this.clienteAgregado.emit();

          // Regresar al menú
          this.router.navigate(['/']);

        },
        error: (error) => {
          this.enviando = false;
          if (error?.error?.errores?.length) {
            this.erroresServidor = error.error.errores;
          } else if (error?.error?.mensaje) {
            this.mensajeError = error.error.mensaje;
          } else {
            this.mensajeError = 'No se pudo agregar el cliente. Verifique que el servidor este activo.';
          }
        },
      });
    } catch (error) {
      this.enviando = false;
      this.mensajeError = 'Ocurrio un error inesperado al enviar el formulario.';
      console.error('[ClienteFormComponent] Error en agregar():', error);
    }
  }
}
