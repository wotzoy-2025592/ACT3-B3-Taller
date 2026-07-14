import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Cliente } from '../models/cliente.model';

interface RespuestaListado {
  clientes: Cliente[];
}

interface RespuestaAgregar {
  mensaje: string;
  cliente?: Cliente;
  errores?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly urlBase = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<RespuestaListado> {
    return this.http.get<RespuestaListado>(this.urlBase);
  }

  agregarCliente(cliente: Cliente): Observable<RespuestaAgregar> {
    return this.http.post<RespuestaAgregar>(this.urlBase, cliente);
  }
}
