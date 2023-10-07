const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        info: {
            title: 'NodeApp API',
            version: '0.1',
            description: 'API de agentes'
        },
    },
    apis: ['./routes/*.js'], // O la ruta donde tienes tus definiciones de API.
};

const expecificacion = swaggerJSDoc(options);

module.exports = [swaggerUI.serve, swaggerUI.setup(expecificacion)];
