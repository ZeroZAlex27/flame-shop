const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ApiError = require("../error/api.error");
const { User, Basket } = require("../models/models");

const generate_jwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return next(ApiError.bad_request("Некорректный email или пароль!"));
        }

        try {
            const candidate = await User.findOne({ where: { email } });

            if (candidate) {
                return next(ApiError.bad_request("Пользователь с такой почтой уже существует!"));
            }

            const hash_password = await bcrypt.hash(password, 5);
            const user = await User.create({ email, role, password: hash_password });
            const basket = await Basket.create({ user_id: user.id });
            const token = generate_jwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return next(ApiError.bad_request("Пользователь не найден!"));
            }

            let compare_password = bcrypt.compareSync(password, user.password);

            if (!compare_password) {
                return next(ApiError.bad_request("Указан неверный пароль!"));
            }

            const token = generate_jwt(user.id, user.email, user.role);

            return res.json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async check(req, res, next) {
        try {
            const token = generate_jwt(req.user.id, req.user.email, req.user.role);

            return res.json({ token });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new UserController();
