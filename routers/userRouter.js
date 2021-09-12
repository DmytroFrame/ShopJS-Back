const Router = require('express')
const router = new Router()
const userControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')



router.get('/auth', authMiddleware, userControllers.check)
router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)


module.exports = router