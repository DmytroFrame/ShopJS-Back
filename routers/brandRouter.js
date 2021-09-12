const Router = require('express')
const router = new Router()
const brandControllers = require('../controllers/brandControllers')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', brandControllers.getAll)
router.post('/', checkRole('ADMIN'), brandControllers.create)



module.exports = router