
# NodePop-Backend

**NodePop-Backend** es el backend del proyecto NodePop, una aplicación para la publicación y gestión de anuncios clasificados. Este backend está diseñado para trabajar en conjunto con el frontend del proyecto: [NodePop-Frontend](https://github.com/Doplax/NodePop-Frontend).

## Características principales

- API RESTful para la gestión de anuncios, usuarios y otros recursos.
- Configuración multilingüe con soporte para `i18n`.
- Microservicio de generación de miniaturas (`thumbnail-microservice`) utilizando `cote`.
- Documentación de la API generada automáticamente con Swagger.
- Configuración flexible para entornos de desarrollo y producción.

## Tecnologías utilizadas

Este backend está construido con las siguientes tecnologías y herramientas:

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para el desarrollo del backend.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información.
- **Mongoose**: ORM para la interacción con MongoDB.
- **JWT (jsonwebtoken)**: Para la autenticación y autorización.
- **Swagger**: Para documentar la API.
- **Multer**: Para manejar la subida de archivos.
- **Cote**: Implementación de microservicios para la generación de miniaturas.
- **Jimp**: Para el procesamiento de imágenes.
- **Morgan**: Para el registro de peticiones HTTP en consola.
- **i18n**: Para la internacionalización.
- **Docker**: Para la ejecución de servicios en contenedores.
- **EJS**: Motor de plantillas para vistas.

## Instalación y configuración

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Doplax/NodePop-Backend.git
   cd NodePop-Backend
   ```

2. **Instala las dependencias**:

   Utilizando npm:
   ```bash
   npm install
   ```
   O utilizando Yarn:
   ```bash
   yarn install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:
   ```
   MONGO_URI=mongodb://<tu-url-de-mongodb>
   JWT_SECRET=<tu-clave-secreta-para-jwt>
   ```

4. **Inicializa la base de datos**:

   ```bash
   npm run init-db
   ```

5. **Ejecuta el proyecto**:

   - Entorno de desarrollo:
     ```bash
     npm run dev
     ```
   - Entorno de producción:
     ```bash
     npm run start
     ```

6. **Opcional**: Ejecuta el microservicio de miniaturas:

   ```bash
   npm run thumbnail-microservice
   ```

## Rutas principales

### Documentación de la API
Puedes acceder a la documentación de la API generada por Swagger en la ruta `/docs`:
```
http://localhost:<puerto>/docs
```

### Autenticación
- **POST /api/auth/login**: Iniciar sesión.
- **POST /api/auth/register**: Registrarse.

### Anuncios
- **GET /api/products**: Listar productos.
- **GET /api/products/:id**: Obtener un producto por ID.
- **POST /api/products**: Crear un nuevo producto (requiere autenticación).
- **PUT /api/products/:id**: Actualizar un producto (requiere autenticación).
- **DELETE /api/products/:id**: Eliminar un producto (requiere autenticación).

## Scripts disponibles

- `npm run start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática.
- `npm run dev:cluster`: Inicia el servidor en modo clúster con nodemon y microservicios.
- `npm run init-db`: Inicializa la base de datos con datos de prueba.
- `npm run init-docker`: Inicia los servicios en contenedores Docker.
- `npm run thumbnail-microservice`: Ejecuta el microservicio para la generación de miniaturas.

## Autor

Este proyecto fue desarrollado por **Pol Valle** ([Doplax](https://github.com/Doplax)).

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras errores o tienes sugerencias para nuevas características, no dudes en abrir un issue o enviar un pull request.

## Licencia

Este proyecto está licenciado bajo la licencia ISC. Consulta el archivo `LICENSE` para más detalles.

---

Con este README, tienes una descripción clara y completa del proyecto. ¿Te gustaría agregar algo más o ajustar algún detalle?