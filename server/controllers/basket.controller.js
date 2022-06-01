const ApiError = require("../error/api.error");
const { Basket, Device } = require("../models/models");

class BasketController {
    async get_basket(req, res, next) {
        try {
            const basket = await Basket.findOne({
                where: { user_id: req.user.id },
                include: {
                    model: Device,
                    through: { attributes: [] },
                },
            });

            return res.json(basket);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async clear_basket(req, res, next) {
        try {
            const basket = await Basket.findOne({
                where: { user_id: req.user.id },
            });

            const result = await basket.removeDevices({
                where: { basket_id: basket.id },
            });

            if (!result) {
                next(ApiError.internal(error.message));
            }

            return res.status(204).send();
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async add_device(req, res, next) {
        const { basket_id, device_id } = req.body;

        try {
            const basket = await Basket.findOne({
                where: { id: basket_id },
            });

            const result = await basket.addDevice(device_id);

            return res.status(204).send();
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async remove_device(req, res, next) {
        const { basket_id, device_id } = req.body;

        try {
            const basket = await Basket.findOne({
                where: { id: basket_id },
            });

            const deleted_rows = await basket.removeDevice(device_id);

            if (deleted_rows === 0) {
                next(ApiError.bad_request("В вашей корзине не было этого товара!"));
            }

            return res.status(204).send();
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new BasketController();
