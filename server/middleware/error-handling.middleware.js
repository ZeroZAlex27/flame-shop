const ApiError = require("../error/api.error");

module.exports = function (err, res) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Непредвиденная ошибка!" });
};
