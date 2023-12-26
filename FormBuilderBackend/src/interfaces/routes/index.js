const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const BaseRoute = require('./v1/BaseRoute');

router.use('/v1', BaseRoute);

//region swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentation',
        version: '1.0.0',
        description: 'Microservice Documentation',
        license: {
            name: 'SamaSoft',
            url: 'https://samasoft.net/',
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        bearerAuth: [],
    }],
    servers: [{
        url: '/api/v1/',
        description: 'Deploy',
    }],
};

const apiRoutesPath = path.join(__dirname, '/v1/*.js');

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis: [apiRoutesPath],
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec, undefined, {docExpansion: 'none'}));
//endregion

module.exports = router;