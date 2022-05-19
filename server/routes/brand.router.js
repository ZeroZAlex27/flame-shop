const Router = require("express");
const router = new Router();
const controller = require("../controllers/brand.controller");

router.post("/", controller.create);
router.get("/", controller.get_all);

module.exports = router;
