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
  updateInfo = async(req, res, next) => {
   const user = await User.findById({_id: req.params.id})
   let newEmoji
   if(req.file) {
      newEmoji = req.file.filename
   }
   else {
     newEmoji = user.emoji
   }

   await User.updateOne({ _id: req.params.id }, {
      idUser : req.body.id,
      name : req.body.name,
      email : req.body.email,    
      emoji : newEmoji
    
    })
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        alert(err)
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
