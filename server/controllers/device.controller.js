const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/api.error");
const { Device, DeviceInfo } = require("../models/models");

class DeviceController {
    async create(req, res, next) {
        let { name, price, brand_id, type_id, info } = req.body;
        const { img } = req.files;

        let file_name = uuid.v4() + ".jpg";

        try {
            img.mv(path.resolve(__dirname, "..", "static", file_name));

            const device = await Device.create({
                name,
                price,
                brand_id,
                type_id,
                img: file_name,
            });

            if (info) {
                info = JSON.parse(info);
                info.forEach((i) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        device_id: device.id,
                    });
                });
            }

            return res.json(device);
        } catch (error) {
            next(ApiError.bad_request(error.message));
        }
    }

    async get_all(req, res) {
        let { brand_id, type_id, limit, page } = req.query;

        page = page || 1;
        limit = limit || 10;

        let offset = page * limit - limit;
        let devices;

        try {
            if (!brand_id && !type_id) {
                devices = await Device.findAndCountAll({ limit, offset });
            }

            if (brand_id && !type_id) {
                devices = await Device.findAndCountAll({ where: { brand_id }, limit, offset });
            }

            if (!brand_id && type_id) {
                devices = await Device.findAndCountAll({ where: { type_id }, limit, offset });
            }

            if (brand_id && type_id) {
                devices = await Device.findAndCountAll({
                    where: { brand_id, type_id },
                    limit,
                    offset,
                });
            }

            return res.json(devices);
        } catch (error) {
            console.log(error);
            next(ApiError.bad_request(error.message));
        }
    }

    async get_one(req, res) {
        const { id } = req.params;

        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: "info" }],
        });

        return res.json(device);
    }
}

module.exports = new DeviceController();
