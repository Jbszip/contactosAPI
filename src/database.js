const mongoose = require('mongoose')
require('dotenv').config()
const {MONGODB_URI} = process.env
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('Database connected: OK')})