const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.nxcyn.mongodb.net/Database_NodeJS_Demo?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect successfully!!");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connect };
