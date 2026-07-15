# Documentación del Proyecto

# Sistema de Gestión de Clientes

## Descripción

El Sistema de Gestión de Clientes es una aplicación web desarrollada bajo una arquitectura Cliente-Servidor, cuyo objetivo es permitir el registro y la visualización de información de clientes.

La aplicación permite:

* Registrar clientes mediante un formulario.
* Visualizar el listado de clientes registrados.
* Acceder a las diferentes vistas mediante un menú de navegación.
* Almacenar la información de manera persistente en una base de datos PostgreSQL.

---

# Objetivos

## Objetivo General

Desarrollar una aplicación web que permita registrar y consultar información de clientes utilizando una arquitectura separada entre Frontend y Backend.

## Objetivos Específicos

* Registrar clientes mediante un formulario.
* Validar la información ingresada por el usuario.
* Almacenar la información en PostgreSQL.
* Consultar y mostrar el listado de clientes.
* Mantener una separación clara entre la interfaz de usuario y la lógica de negocio.

---

# Tecnologías Utilizadas

| Tecnología | Descripción                                                     |
| ---------- | --------------------------------------------------------------- |
| TypeScript | Lenguaje principal utilizado tanto en Frontend como en Backend. |
| Angular    | Framework para el desarrollo de la interfaz de usuario.         |
| Node.js    | Entorno de ejecución para el servidor.                          |
| PostgreSQL | Base de datos relacional donde se almacenan los clientes.       |
| HTML5      | Estructura de las vistas.                                       |
| CSS3       | Estilos de la aplicación.                                       |
| REST API   | Comunicación entre Frontend y Backend mediante HTTP.            |

---

# Arquitectura del Proyecto

El proyecto sigue una arquitectura Cliente-Servidor (Frontend + Backend), donde cada capa tiene responsabilidades específicas.

```
                Usuario
                   │
                   ▼
            Angular (Frontend)
                   │
             HTTP / REST API
                   │
                   ▼
           Node.js (Backend)
                   │
          Lógica de Negocio
                   │
                   ▼
            PostgreSQL
```

## Frontend

Responsabilidades:

* Mostrar el formulario de registro.
* Validar los datos ingresados.
* Consumir los servicios REST.
* Mostrar el listado de clientes.
* Administrar la navegación mediante el menú.

## Backend

Responsabilidades:

* Exponer los servicios REST.
* Validar la información recibida.
* Gestionar las operaciones CRUD.
* Conectarse con PostgreSQL.

## Base de Datos

Responsabilidades:

* Almacenar la información de los clientes.
* Garantizar la integridad de los datos.
* Responder consultas realizadas por el Backend.

---

# Estructura del Proyecto

```
proyecto/

│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── menu/
│   │   │   │   ├── cliente-form/
│   │   │   │   └── cliente-list/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── app-routing.module.ts
│   │   └── assets/
│   └── angular.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── database/
│   ├── app.ts
│   └── package.json
│
└── README.md
```

---

# Funcionalidades

## 1. Menú Principal

El sistema dispone de un menú de navegación desde el cual el usuario puede acceder a:

* Registrar Cliente
* Listar Clientes

El menú permanece disponible durante toda la navegación.

---

## 2. Registro de Clientes

El formulario permite registrar un cliente mediante los siguientes campos:

| Campo  | Tipo   |
| ------ | ------ |
| ID     | Número |
| Nombre | Texto  |
| Edad   | Número |

### Validaciones

* Todos los campos son obligatorios.
* El ID debe ser único.
* La edad debe ser un número mayor que cero.
* El nombre no puede estar vacío.

Al guardar la información se realiza una petición HTTP al Backend, el cual almacena el registro en PostgreSQL.

---

## 3. Listado de Clientes

La vista de listado consulta la información almacenada mediante un servicio REST y presenta los clientes en una tabla.

### Información mostrada

* ID
* Nombre
* Edad

---

# Modelo de Datos

Tabla: **clientes**

| Campo  | Tipo         |
| ------ | ------------ |
| id     | INTEGER (PK) |
| nombre | VARCHAR(100) |
| edad   | INTEGER      |

---

# API REST

## Obtener clientes

**GET**

```
/api/clientes
```

Respuesta

```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "edad": 30
  }
]
```

---

## Registrar cliente

**POST**

```
/api/clientes
```

Solicitud

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "edad": 30
}
```

Respuesta

```json
{
  "mensaje": "Cliente registrado correctamente."
}
```

---

# Flujo del Sistema

```
Usuario

    │

    ▼

Formulario Angular

    │

HTTP POST

    │

Backend Node.js

    │

Inserción

    │

PostgreSQL

    │

Respuesta

    │

Angular

    │

Listado actualizado
```

---

# Comunicación entre Capas

1. El usuario ingresa la información del cliente.
2. Angular valida los datos.
3. Angular envía una petición HTTP al Backend.
4. Node.js procesa la solicitud.
5. El Backend almacena la información en PostgreSQL.
6. PostgreSQL responde al Backend.
7. El Backend devuelve la respuesta al Frontend.
8. Angular actualiza el listado de clientes.

---

# Ventajas de la Arquitectura

* Separación entre presentación y lógica de negocio.
* Escalabilidad del sistema.
* Facilidad de mantenimiento.
* Reutilización de servicios REST.
* Independencia entre Frontend y Backend.
* Mayor organización del código.

---

# Requisitos

## Frontend

* Node.js
* Angular CLI
* TypeScript

## Backend

* Node.js
* Express
* TypeScript

## Base de Datos

* PostgreSQL

---

# Ejecución del Proyecto

## Frontend

```bash
npm install
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200
```

## Backend

```bash
npm install
npm run start
```

Servidor disponible en:

```
http://localhost:3000
```

---

# Base de Datos

Crear la tabla de clientes:

```sql
CREATE TABLE clientes (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL
);
```

---

# Conclusión

El proyecto implementa una arquitectura Cliente-Servidor utilizando Angular para el Frontend, Node.js con TypeScript para el Backend y PostgreSQL como sistema de gestión de base de datos. La aplicación ofrece una solución sencilla para registrar y consultar clientes mediante servicios REST, manteniendo una estructura modular, escalable y fácil de mantener.
