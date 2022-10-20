const app = require('./server')
require('./database')

const port = app.get('port')
app.listen(port, ()=>{
    console.log('Server running on port',port)
})
