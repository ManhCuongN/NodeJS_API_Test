const { body, validationResult } = require("express-validator");

//validate Register Form
const validateRegisterUser = () => {
  return [

    body("id")
    .notEmpty().withMessage(" ID Please don't leave it blank")
    .matches(/^[a-z0-9_-]{4,16}$/).withMessage("ID : Please enter between 4-16 characters including lowercase letters and numbers"),

    body("email")
      .notEmpty().withMessage("Email:Please don't leave it blank")
      .isEmail().withMessage("Email is required")
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      .withMessage("Email is required"),

    body("password").matches(/^[a-z0-9_-]{4,16}$/).withMessage("Password: Enter between 4-16 characters including lowercase letters and numbers"),
    
    body("name").notEmpty().isLength({max: 16}).withMessage("Name : Up to 16 characters")      ,
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
  else {
    next();
  }
};

module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validationRegError,
  validationLoginError,
};
