const Router = require('express')
const router = new Router()
const deviceControllers = require('../controllers/deviceControllers')
const checkRole = require('../middleware/checkRoleMiddleware')



router.get('/', deviceControllers.getAll)
router.get('/:id', deviceControllers.getOne)
router.post('/', checkRole('ADMIN'), deviceControllers.create)


module.exports = router