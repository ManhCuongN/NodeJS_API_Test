const express = require("express");
const router = express.Router();
const authController = require("../../app/controllers/api/apiAuthencation");
const validate = require("../../app/validator/validatorApi");
const upload = require("../../app/middelwares/uploadImage")


router.post("/login", validate.validateLoginUser(),validate.validationLoginError,authController.loginApiUser);

router.post("/signup",upload.single("upload"),validate.validateRegisterUser(),validate.validationRegError, authController.signUpUser);

module.exports = router;
