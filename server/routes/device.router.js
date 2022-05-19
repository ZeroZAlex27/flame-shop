const Router = require("express");
const router = new Router();
const controller = require("../controllers/device.controller");

router.post("/", controller.create);
router.get("/", controller.get_all);
router.get("/:id", controller.get_one);

module.exports = router;
