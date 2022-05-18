const Router = require("express");
const router = new Router();
const type_controller = require("../controllers/type.controller");

router.post("/", type_controller.create);
router.get("/", type_controller.get_all);

module.exports = router;
