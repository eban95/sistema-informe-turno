# 🛠️ Sistema de Informe de Turno

Aplicación web desarrollada para gestionar y registrar las intervenciones realizadas por los mecánicos durante un turno de trabajo, permitiendo llevar control, trazabilidad y organización de la información operativa.

---

## 🚀 Tecnologías utilizadas

- **Frontend:** Angular
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Pruebas API:** Postman

---

## 📌 Funcionalidades principales

### 🔹 1. Informe de turno
- Registro de intervenciones
- Captura de:
  - Mecánico
  - Máquina
  - Área
  - Comentarios
  - Tiempo (minutos)
- Guardado de todas las intervenciones del turno

---

### 🔹 2. Ejecutados
- Visualización de registros almacenados
- Funcionalidades CRUD:
  - Ver detalle
  - Editar información
  - Eliminar registros

---

### 🔹 3. Órdenes (en desarrollo 🚧)
- Módulo pensado para gestión de órdenes de trabajo
- Próxima implementación

---

## 🧠 Arquitectura

El sistema sigue una arquitectura cliente-servidor basada en APIs REST:

- El frontend en Angular consume servicios HTTP
- El backend en Express maneja las rutas y lógica
- MongoDB almacena la información
