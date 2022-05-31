const Router = require("express");
const router = new Router();
const controller = require("../controllers/device.controller");
const check_role = require("../middleware/check-role.middleware");
const multer = require("../middleware/multer.middleware");

router.post("/", check_role("ADMIN"), controller.create);
router.post(
    "/:id/upload-photo",
    check_role("ADMIN"),
    multer.single("file"),
    controller.upload_photo
);
router.get("/", controller.get_all.bind(controller));
router.get("/:id", controller.get_one.bind(controller));

module.exports = router;
