const User = require("../../model/User");
var crypto = require('crypto');
var alert = require('alert');
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
    const path = req.file.filename
    User.findOne({ email: req.body.email })
      .then((data) => {
        if (data) {
          res.status(300).json("Email đã tồn tại");
        } else {
          const user = new User(
            {
              idUser : req.body.id,
              email : req.body.email,
              name : req.body.name,
              password : crypto.createHash('sha256').update(req.body.password).digest('base64'),
              emoji : path
            }
          );
          return user
            .save()
            .then(() => res.redirect("/web/auth/login"))
            .catch((error) => {
              res.json(error);
            });
       }
     })
      .catch((err) => res.status(500).json(err));
  }

  //Login User
  loginUser = async (req, res, next) => {
    try {
      const iUsername = req.body.id
      const isCorrectPassword = crypto.createHash('sha256').update(req.body.password).digest('base64');

      const user = await User.findOne({ username: iUsername,password : isCorrectPassword });
      if (!user) {
        throw new Error();
      }
      
      if (!isCorrectPassword) {
        throw new Error();
      }

      if(user && isCorrectPassword) {
         res.redirect("/")
      }
      
    } catch (error) {
      alert("Kiểm tra lại ID hoặc Password")
    }}
}
module.exports = new AuthController();
