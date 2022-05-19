const User = require("../../model/User");

class HomeController {
  
  //Show product and page home
  show = async (req, res, next) => {
     User.find({}).then((user) => {
       res.render("home", {user: user})
     })
  };

  // Edit
  editInfo(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        res.render("product/edit", { user: user });
      })
      .catch(next);
  }

  //Update
  updateInfo(req, res, next) {
  
    User.updateOne({ _id: req.params.id }, {
      idUser : req.body.id,
      name : req.body.name,
      email : req.body.email,    
      emoji : req.file.filename
    
    })
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      })
  }
  //DELETE
  destroy(req, res, next) {
     User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

}
module.exports = new HomeController();
