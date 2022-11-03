const express = require('express')
require('dotenv').config()
const router = require('./v1/routes/index')
const userRoutes = require('./v1/routes/user')
const contactRoutes = require('./v1/routes/contact')
const morgan = require('morgan')
const cors = require('cors')
const apicache = require('apicache')
const {swaggerDocs: v1SwaggerDocs} = require('./v1/swagger.js')



//Inicialización
const app = express()
const cache = apicache.middleware;

//Configuraciones
const {PORT} = process.env
app.set('port', PORT || 3001)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false})) //Cada vez que recibe info de un formulario la convierte en JSON
app.use(cors())
app.use(morgan('dev'))
app.use(cache('2 minutes'))
v1SwaggerDocs(app, PORT)


//Variables globales

//Rutas
app.use("/api/v1", router)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/contactos", contactRoutes)


module.exports = app