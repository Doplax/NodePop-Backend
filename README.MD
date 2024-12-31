# Common Backend for Projects

This project is a **common backend** designed to serve as a unified backend for multiple applications, avoiding the need to develop a separate backend for each project. By centralizing backend logic, maintenance, scalability, and development efficiency are improved.

Currently, this backend serves the following projects:
- [NodePop Frontend](https://github.com/Doplax/NodePop-Frontend)
- [Spotify Angular](https://github.com/Doplax/Spotify-Angular)

---

## Key Features

- **Data Validation**: Ensures consistency and security for user-provided data.
- **MongoDB Connection**: Uses MongoDB as the main database for data storage.
- **Linter Configuration**: Ensures clean and readable code following best practices.
- **Swagger Documentation**: All endpoints are documented using Swagger to facilitate integration and consumption.
- **Cluster and Microservices**: Advanced configuration for cluster environments and microservices using Cote.
- **Docker Support**: Enables running the backend in containers using `docker-compose`.

---

## Technologies Used

### Core Dependencies
- **Node.js**: Runtime environment.
- **Express.js**: Framework for building fast and scalable APIs.
- **Mongoose**: ODM for interacting with MongoDB.
- **JWT (jsonwebtoken)**: Used for token-based authentication.
- **Swagger**: For dynamic API documentation generation.
- **i18n**: For internationalization.

### Development Tools
- **ESLint**: Linter to maintain clean and consistent code.
- **Nodemon**: Development tool for automatic server restarts.
- **Cross-Env**: For configuring environment variables.
- **Docker**: To run the backend in containers.
- **EJS**: Template engine.

---

## Installation and Configuration

1. **Clone this repository**:
   ```bash
   git clone https://github.com/Doplax/NodePop-Backend.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and add the following variables:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<databaseName>
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```
   The server will be available at [http://localhost:4000](http://localhost:4000).

5. **Optional: Run in Docker mode**:
   ```bash
   npm run init-docker
   ```

---

## API Documentation

API documentation is available via Swagger. Once the server is running, you can access it at:
[http://localhost:4000/docs](http://localhost:4000/docs)

---

## License

This project is distributed under the **ISC** license. For more details, see the `LICENSE` file.

---

## Author

**Pol Valle**  
- [LinkedIn](https://www.linkedin.com/in/pol-valle-montes/)  
- [GitHub](https://github.com/Doplax)  

---
