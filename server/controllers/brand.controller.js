const ApiError = require("../error/api.error");
const { Brand } = require("../models/models");

class BrandController {
    async create(req, res, next) {
        const { name } = req.body;

        try {
            const brand = await Brand.create({ name });

            return res.json(brand);
        } catch (error) {
            next(ApiError.bad_request(error.message));
        }
    }

    async get_all(_req, res, next) {
        try {
            const brands = await Brand.findAll();

            return res.json(brands);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new BrandController();
