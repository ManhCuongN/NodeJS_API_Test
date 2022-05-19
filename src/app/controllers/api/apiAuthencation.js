const User = require("../../model/User");
var crypto = require('crypto');

class AuthController {
  //Login User
  loginApiUser = async (req, res, next) => {
    const user = await User.findOne({ idUser: req.body.id });

    if (!user) {
      res.status(400).send("The user not found ");
    }
    const isCorrectPassword = crypto.createHash('sha256').update(req.body.password).digest('base64')
    ;
    if(isCorrectPassword != user.password) {
      res.status(400).send("Password is wrong ");

    }
    if (user && isCorrectPassword) {
      res.status(200).send("Login successfully");
    } 
  };

  //Show List
  signUpUser(req, res, next) {

    const path = req.file.filename
    User.findOne({ idUser: req.body.id })
      .then((data) => {
        if (data) {
          res.status(300).json("Account is already registered");
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
            .then(() => res.status(200).send("Sign Up Successfully"))
            .catch((error) => {
              res.send(error);
            });
       }
     })
      .catch((err) => res.status(500).json(err));
  }
}
module.exports = new AuthController();
