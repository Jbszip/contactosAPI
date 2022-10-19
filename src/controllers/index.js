const indexController = {}

indexController.renderInicio = (req, res, next) => {
    res.send('Bienvenido a la API de contactos')
}

module.exports = indexController