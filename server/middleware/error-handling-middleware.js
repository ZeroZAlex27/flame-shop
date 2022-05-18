const api_error = require("../error/api.error");

module.exports = function (err, req, res, next) {
    if (err instanceof api_error) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Непредвиденная ошибка!" });
};
