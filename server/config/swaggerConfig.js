const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
dotenv.config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hippo API Documentation',
            version: '1.0.0',
            description: 'This is a simple API documentation example for the Hippo project',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api/v1`,
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        apis: ['./routes/*.js'],
    },
    apis: ['./routes/*.js'], 
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;
