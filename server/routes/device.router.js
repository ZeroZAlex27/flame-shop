const Router = require("express");
const router = new Router();
const controller = require("../controllers/device.controller");
const check_role = require("../middleware/check-role-middleware");

router.post("/", check_role("ADMIN"), controller.create);
router.get("/", controller.get_all);
router.get("/:id", controller.get_one);

module.exports = router;
