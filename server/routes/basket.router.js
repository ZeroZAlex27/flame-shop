const Router = require("express");
const router = new Router();
const controller = require("../controllers/basket.controller");
const auth_middleware = require("../middleware/auth.middleware");

router.get("/", auth_middleware, controller.get_basket);
router.delete("/", auth_middleware, controller.clear_basket);

router.post("/add", auth_middleware, controller.add_device);
router.delete("/remove", auth_middleware, controller.remove_device);

module.exports = router;
