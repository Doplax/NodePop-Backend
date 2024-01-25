# Práctica Backend Avanzado
## Bootcamp Web15 2023

### Descripción
Esta práctica se basa en el código desarrollado durante la práctica de fundamentos de Node.js, enfocándose en avanzar con nuevas funcionalidades.

### Tareas

- [ ] **Autenticación**
  - [ ] Implementar autenticación JWT en el API.
    - [ ] Crear POST `/api/authenticate` para login y devolución de token JWT.
    - [ ] Configurar GET `/api/anuncios` para funcionar con JWT (200 OK con token, 401 sin token o con token caducado).

- [ ] **Internacionalización**
  - [ ] Implementar multi-idioma (Español e Inglés) en el frontend de Nodepop.
  - [ ] Añadir selector de idioma para cambiar entre Español e Inglés.

- [ ] **Subida de Imagen con Tarea en Background**
  - [ ] Crear endpoint POST `/api/anuncios` para subir imágenes.
  - [ ] Guardar imágenes en el servidor y devolver rutas en GET `/api/anuncios`.
  - [ ] Implementar sistema de creación de thumbnails en background (cote.js o RabbitMQ).
  
- [ ] **Testing (Opcional)**
  - [ ] Incluir tests del API con Supertest.
  - [ ] Configurar ejecución de tests con `npm test`.

- [ ] **BONUS TRACK: Crear un Módulo Público**
  - [ ] Desarrollar y publicar un módulo de utilidad en npm.js.
  - [ ] Añadir URL del módulo en el `README.md`.

### Notas para el Desarrollador
- Es recomendable empezar por la autenticación para integrarla en las siguientes etapas.
- No es necesario internacionalizar el API.
- La calidad y el mantenimiento del código son cruciales.

