const Router = require("express");
const router = new Router();
const controller = require("../controllers/user.controller");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/auth", controller.check);

module.exports = router;
