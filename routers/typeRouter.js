const Router = require('express')
const router = new Router()
const typeControllers = require('../controllers/typeControllers')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', typeControllers.getAll)
router.post('/', checkRole('ADMIN'), typeControllers.create)



module.exports = router