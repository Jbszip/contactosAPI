const express = require('express')
require('dotenv').config()
const router = require('./routes/index.js')
const userRoutes = require('./routes/user')
const contactRoutes = require('./routes/contact')
const morgan = require('morgan')
const cors = require('cors')
const {createNewContact} = require('./controllers/contact')

//Inicialización
const app = express()

//Configuraciones
const {PORT} = process.env
app.set('port', PORT || 3001)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false})) //Cada vez que recibe info de un formulario la convierte en JSON
app.use(cors())
app.use(morgan('dev'))


//Variables globales

//Rutas
app.use(router)
app.use(userRoutes)
app.use(contactRoutes)

module.exports = app