const User = require("../../model/User");
var crypto = require('crypto');
var alert = require('alert');
var {validationResult} = require('express-validator');
const validate = require('../../validator/validatorForm');
class AuthController {
  //render form resgister
  renderSignUp(req, res, next) {
    res.render("authview/signup");
  }

  //render form login
  renderLogIn(req, res, next) {
    res.render("authview/login");
  }

  //Post data sign up
  createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(alert);
    return;
  } 
  else {
    const path = req.file.filename
    User.findOne({ email: req.body.email })
      .then((data) => {
        if (data) {
          alert("Email đã tồn tại")
        } else {
          const user = new User(
            {
              idUser : req.body.id,
              email : req.body.email,
              name : req.body.name,
              password : crypto.createHash('sha256').update(req.body.password).digest('base64'),
              emoji : path || ''
            }
          );
          return user
            .save()
            .then(() => res.redirect("/web/auth/login"))
            .catch((error) => {
              alert("Kiểm tra lại thông tin các trường")
            });
       }
     })
      .catch((err) => alert("Kiểm tra lại thông tin các trường"))
  }
   

  }

  //Login User
  loginUser = async (req, res, next) => {
    try {
      const iUsername = req.body.id
      const isCorrectPassword = crypto.createHash('sha256').update(req.body.password).digest('base64');

      const user = await User.findOne({ username: iUsername,password : isCorrectPassword });
      if (!user) {
        alert("Kiểm tra lại ID hoặc Password")
      }
      
      if (!isCorrectPassword) {
        alert("Kiểm tra Password")
      }

      if(user && isCorrectPassword) {
         res.redirect("/")
      }
      
    } catch (error) {
      alert("Kiểm tra lại ID hoặc Password")
    }}
}
module.exports = new AuthController();
