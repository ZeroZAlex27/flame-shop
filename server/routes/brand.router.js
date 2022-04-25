const Router = require("express");
const router = new Router();
const brand_controller = require("../controllers/brand.controller");

router.post("/", brand_controller.create);
router.get("/", brand_controller.get_all);

module.exports = router;
