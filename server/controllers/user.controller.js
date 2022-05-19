const ApiError = require("../error/api.error");
const { User } = require("../models/models");

class UserController {
    async registration(req, res) {}

    async login(req, res) {}

    async check(req, res, next) {
        const { id } = req.query;

        if (!id) {
            return next(ApiError.bad_request("Не задан ID"));
        }

        res.json(id);
    }
}

module.exports = new UserController();
