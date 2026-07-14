-- Script de referencia para creacion manual de la base de datos y tabla.
-- El backend crea la tabla automaticamente al iniciar (ver src/persistence/db.ts),
-- pero este script se deja como respaldo/documentacion.

-- Ejecutar conectado a la base de datos de mantenimiento "postgres":
-- CREATE DATABASE clientes_db;

-- Ejecutar conectado ya a la base de datos "clientes_db":
CREATE TABLE IF NOT EXISTS cliente (
    codigo_cliente    VARCHAR(20)  PRIMARY KEY,
    nombre_cliente    VARCHAR(100) NOT NULL,
    direccion_cliente VARCHAR(200) NOT NULL,
    telefono_cliente  VARCHAR(20)  NOT NULL
);
