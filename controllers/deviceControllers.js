const path = require('path')
const uuid = require('uuid')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require("../error/ApiError")
const { info } = require('console')


class DeviceControllers {
    async create(req, res, next) {
        try {
            let{ name, price, brandId, typeId, Info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(element => {
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id
                    })
                });
            }
    
            return res.json(device)

        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(error.message))
        }
        
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let device;
        if (!brandId && !typeId) {
            device = await Device.findAndCountAll({limit, offset})
        } 
        if (brandId && !typeId) {
            device = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            device = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            device = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }

        return res.json(device)
    }

    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne({ 
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            })
        return res.json(device)
    }
}


module.exports = new DeviceControllers()