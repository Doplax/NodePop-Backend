# **NodePop Backend API**

## Despliegue en AWS
[Despliegue de Node](http://13.48.193.130/)
[Despliegue de React](http://ec2-13-48-193-130.eu-north-1.compute.amazonaws.com/login)

## **Overview**

NodePop is a backend API developed for the Full Stack 2023 Bootcamp by Keep Coding. It features product management, including thumbnail creation for product images using Cote.js and Jimp in the background.

## **Setup**

### **Installation**
Configure environment variables in a **`.env`** file at the project root:

```bash
PORT=3000
DB_URI=mongodb://localhost:27017/nodepop
JWT_SECRET=your_jwt_secret
```

Initialize the database:

```bash
npm run init-db
```

### **Running the Application**

Start the application in development mode:

```bash
npm run dev
```

Launch the thumbnail creation microservice:

```bash
npm run thumbnail-microservice
```

## **API Usage**

The API supports user authentication, product management, and frontend language switching. A Postman file (**`NodePop-Backend.postman_collection.json`**) is included for easy API testing and usage.

### **Endpoints Overview**

### Products

- **List All Products**: **`GET /api/products`** requires Bearer Token authentication.
- **Retrieve a Specific Product**: **`GET /api/products/:id`** requires Bearer Token authentication.
- **Create a Product**: **`POST /api/products`** with fields **`name`**, **`price`**, **`isForSale`**, **`photo`**, and **`tags[]`** requires Bearer Token authentication.
- **Update a Product**: **`PUT /api/products/:id`** for modifying product details requires Bearer Token authentication.
- **Delete a Product**: **`DELETE /api/products/:id`** for removing a product requires Bearer Token authentication.

### Authentication

- **User Registration**: **`POST /api/auth/register`** with **`email`** and **`password`** in the request body.
- **User Login**: **`POST /api/auth/login`** with **`email`** and **`password`** to receive a Bearer Token for authenticated requests.

## **Main Features**

- **JWT Authentication**: Ensures secure communication between client and server.
- **Internationalization**: Supports multiple languages in the frontend, enhancing accessibility and user experience.
- **Background Image Processing**: Automates thumbnail creation for product images using Cote.js and Jimp.

##
