const Router = require("express");
const router = new Router();
const device_controller = require("../controllers/device.controller");

router.post("/", device_controller.create);
router.get("/", device_controller.get_all);
router.get("/:id", device_controller.get_one);

module.exports = router;
