const Router = require("express");
const router = new Router();
const user_controller = require("../controllers/user.controller");

router.post("/registration", user_controller.registration);
router.post("/login", user_controller.login);
router.get("/auth", user_controller.check);

module.exports = router;
