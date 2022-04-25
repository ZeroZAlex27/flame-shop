const Router = require("express");
const router = new Router();
const user_router = require("./user.router");
const type_router = require("./type.router");
const brand_router = require("./brand.router");
const device_router = require("./device.router");

router.use("/user", user_router);
router.use("/type", type_router);
router.use("/brand", brand_router);
router.use("/device", device_router);

module.exports = router;
