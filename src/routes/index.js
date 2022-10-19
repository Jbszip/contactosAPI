const {Router} = require('express')
const {renderInicio} = require('../controllers/index')

const router = Router()
router.get('/', renderInicio)

module.exports = router