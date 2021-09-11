const Router = require('express')
const router = new Router()
const deviceControllers = require('../controllers/deviceControllers')




router.get('/', deviceControllers.getAll)
router.get('/:id', deviceControllers.getOne)
router.post('/', deviceControllers.create)


module.exports = router