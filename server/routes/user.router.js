const Router = require("express");
const router = new Router();
const controller = require("../controllers/user.controller");
const auth_middleware = require("../middleware/auth.middleware");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/auth", auth_middleware, controller.check);

module.exports = router;
