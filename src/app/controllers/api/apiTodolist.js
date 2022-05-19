const User = require("../../model/User");

class HomeController {
  //Show List
  showList(req, res, next) {
    User.find({})
      .then((user) => {
        res.status(200).send({ user });
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  }

  //Delete Item
  deleteItem(req, res, next) {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          res.status(200).json({ success: true, message: "Delete Successful" });
        } else {
          res.status(404).json({ success: false, message: "Delete Failed" });
        }
      })
      .catch((error) => {
        res.status(400).json({ success: false, message: error });
      });
  }

  //Update product
  updateItem(req, res, next) {
    const userUpdate = User.findByIdAndUpdate(req.params.id, {
       idUser: req.body.id,
       name: req.body.name,
       email: req.body.email,
       emoji:    req.file.filename
    })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

}


module.exports = new HomeController();
