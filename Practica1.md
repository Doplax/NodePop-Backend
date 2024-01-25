# Práctica WEB-API/Node.js/MongoDB
## Bootcamp Web15 2023

### Descripción
Desarrollo de la API para el servicio de venta de artículos de segunda mano "Nodepop". Esta API será usada por desarrolladores de iOS o Android.

### Tareas

- [ ] **Configuración Inicial**
  - [ ] Crear app Express y probarla (`npx express-generator nodepop --ejs`).
  - [ ] Instalar Mongoose y probar el modelo de anuncios (ej. `anuncio.save`).

- [ ] **Inicialización de Base de Datos**
  - [ ] Crear script de inicialización de la base de datos (`initDB.js`).
  - [ ] Configurar `initDB.js` para borrar tablas y cargar anuncios usando `deleteMany` e `insertMany`.

- [ ] **Documentación y README**
  - [ ] Crear un fichero `README.md` con instrucciones de uso.

- [ ] **Desarrollo del API**
  - [ ] Crear versión básica del API (GET `/apiv1/anuncios` sin filtros).
  - [ ] Implementar lista de anuncios con paginación y filtros (tag, tipo, rango de precio, nombre).
  - [ ] Implementar endpoint para listar tags existentes.
  - [ ] Implementar endpoint para la creación de anuncios.

- [ ] **Desarrollo Frontend**
  - [ ] Crear página de inicio del site con EJS que muestre lista de anuncios.
  - [ ] Implementar aplicación de filtros en la URL (ej. `http://localhost:3000/?start=1&limit=3&sort=name&tag=lifestyle`).

- [ ] **Detalles Adicionales**
  - [ ] Definir y probar el modelo de mongoose para anuncios.
  - [ ] Preparar y cargar `anuncios.json` con datos de ejemplo.
  - [ ] Configurar servidor para devolver imágenes desde `/public/images/`.

- [ ] **Calidad de Código y Documentación Adicional**
  - [ ] Validar código con ESLint.
  - [ ] Documentar API con Swagger en Express (opcional).

### Notas para el Desarrollador
- Recordar la importancia de un código bien formateado para facilitar el mantenimiento.
- En esta fase inicial, no son necesarios tests unitarios ni de integración.
