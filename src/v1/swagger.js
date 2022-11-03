const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('../../openapi.json')

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}

module.exports = {swaggerDocs}