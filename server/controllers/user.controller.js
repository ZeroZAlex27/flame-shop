const api_error = require("../error/api.error");

class UserController {
    async registration(req, res) {}

    async login(req, res) {}

    async check(req, res, next) {
        const { id } = req.query;

        if (!id) {
            return next(api_error.bad_request("Не задан ID"));
        }

        res.json(id);
    }
}

module.exports = new UserController();
