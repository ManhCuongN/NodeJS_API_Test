const express = require("express");
const router = express.Router();
const homeController = require("../../app/controllers/web/HomeController");
const upload = require("../../app/middelwares/uploadImage")

router.get("/", homeController.show);

router.get(
  "/web/home/:id/edit",
  homeController.editInfo
);
router.put(
  "/web/home/:id",
  upload.single("upload"),
  homeController.updateInfo
);
router.delete(
  "/web/home/:id",
  homeController.destroy
);

module.exports = router;
