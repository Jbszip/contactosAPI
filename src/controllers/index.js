const indexController = {}

indexController.renderInicio = (req, res, next) => {
    res.send('Bienvenido a la API con buenas prácticas')
}

module.exports = indexController