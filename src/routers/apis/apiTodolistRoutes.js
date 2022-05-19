const express = require("express");
const router = express.Router();
const apiTodolistController = require("../../app/controllers/api/apiTodolist");
const upload = require("../../app/middelwares/uploadImage")

router.get( "/info",apiTodolistController.showList);
 
router.delete("/:id",apiTodolistController.deleteItem);
  
router.put("/:id",upload.single("upload"), apiTodolistController.updateItem);


module.exports = router;
