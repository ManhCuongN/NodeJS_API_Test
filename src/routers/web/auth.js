const express = require("express");
const router = express.Router();
const authController = require("../../app/controllers/web/AuthController");
const validate = require("../../app/validator/validatorForm");
const upload = require("../../app/middelwares/uploadImage")

router.get("/signup", authController.renderSignUp);
router.get("/login", authController.renderLogIn);


router.post(
  "/signup_data",
  upload.single("upload"),
  validate.validateRegisterUser(),
  validate.validationRegError,
  authController.createUser
);

router.post(
  "/loginUser",
  validate.validateLoginUser(),
  validate.validationLoginError,
  authController.loginUser
);

module.exports = router;
