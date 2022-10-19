const {Router} = require('express')
const {signup, login, verifyToken} = require('../controllers/user')

const router = Router()

router.post('/signup', signup)

router.post('/login', login)

router.post('/verify', verifyToken)

module.exports = router
