const path = require('path')
const uuid = require('uuid')
const { Device } = require('../models/models')
const ApiError = require("../error/ApiError")


class DeviceControllers {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, Info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
    
            return res.json(device)
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(error.message))
        }
        
    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}


module.exports = new DeviceControllers()