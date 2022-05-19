const { body, validationResult } = require("express-validator");

//validate Register Form
const validateRegisterUser = () => {
  return [

    body("id")
    .notEmpty().withMessage("Please don't leave it blank")
    .matches(/^[a-z0-9_-]{4,16}$/).withMessage("Please enter between 4-16 characters including lowercase letters and numbers"),

    body("email")
      .notEmpty().withMessage("Please don't leave it blank")
      .isEmail().withMessage("Email is required")
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      .withMessage("Email is required"),

    body("password").matches(/^[a-z0-9_-]{4,16}$/).withMessage("Enter between 4-16 characters including lowercase letters and numbers"),
    
    body("name").notEmpty().isLength({max: 16}).withMessage("Up to 16 characters")      ,
  ];
};

//validate Login Form
const validateLoginUser = () => {
  return [
    body("id").notEmpty().withMessage("Please don't leave it blank"),

    body("password").notEmpty().withMessage("Please don't leave it blank"),
  ];
};

//Error Register
const validationRegError = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render("authview/signup", { alert: alert });
  }
  next();
};

//Error Login
const validationLoginError = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render("authview/login", { alert: alert });
  }
  next();
};

module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validationRegError,
  validationLoginError,
};
