const multipart = require("../controllers/multipart.controller");

const ApiError = require("../error/api.error");
const { Device, DeviceInfo, Picture } = require("../models/models");

class DeviceController {
    include_attributes() {
        return [
            {
                model: Picture,
                as: "picture",
            },
        ];
    }

    exclude_attributes() {
        return {
            exclude: ["picture_id"],
        };
    }

    async create(req, res, next) {
        let { name, price, brand_id, type_id, info } = req.body;

        try {
            const device = await Device.create({
                name,
                price,
                brand_id,
                type_id,
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

            return res.json({ id: device.id });
        } catch (error) {
            next(ApiError.bad_request(error.message));
        }
    }

    async upload_photo(req, res, next) {
        const id = req.params.id;
        const file = req.file;

        try {
            const picture_url = await multipart.upload(file);

            const picture = await Picture.create({
                picture_url: picture_url,
            });

            if (!picture) {
                next(ApiError.bad_request(error.message));
            }

            const picture_id = picture.get("id");

            const result = await Device.update({ picture_id: picture_id }, { where: { id: id } });

            if (!result) {
                next(ApiError.bad_request(error.message));
            }

            return res.status(204).send();
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async get_all(req, res, next) {
        let { brand_id, type_id, limit, page } = req.query;

        page = page || 1;
        limit = limit || 10;

        let offset = page * limit - limit;
        let devices;

        try {
            if (!brand_id && !type_id) {
                devices = await Device.findAndCountAll({
                    limit,
                    offset,
                    include: this.include_attributes(),
                    attributes: this.exclude_attributes(),
                });
            }

            if (brand_id && !type_id) {
                devices = await Device.findAndCountAll({
                    where: { brand_id },
                    limit,
                    offset,
                    include: this.include_attributes(),
                    attributes: this.exclude_attributes(),
                });
            }

            if (!brand_id && type_id) {
                devices = await Device.findAndCountAll({
                    where: { type_id },
                    limit,
                    offset,
                    include: this.include_attributes(),
                    attributes: this.exclude_attributes(),
                });
            }

            if (brand_id && type_id) {
                devices = await Device.findAndCountAll({
                    where: { brand_id, type_id },
                    limit,
                    offset,
                    include: this.include_attributes(),
                    attributes: this.exclude_attributes(),
                });
            }

            return res.json(devices);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async get_one(req, res, next) {
        const { id } = req.params;

        try {
            const device = await Device.findOne({
                where: { id },
                include: [
                    { model: DeviceInfo, as: "info" },
                    { model: Picture, as: "picture" },
                ],
                attributes: this.exclude_attributes(),
            });

            return res.json(device);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new DeviceController();
