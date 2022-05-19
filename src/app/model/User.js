const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    idUser: { type: String, maxLength: 255, require: true},
    email: { type: String, maxLength: 255, require: true },
    password: { type: String, maxLength: 655, require: true },
    name : { type: String, maxLength: 255, require: true},
    emoji: { type: String}
  },

  {
    timestamps: true,
  }
);

// User.pre("save", async function (next) {
//   try {
//     // const salt = await bcrypt.genSalt(10);

//     const passwordHash = await sha256(this.password)
//     console.log(passwordHash);
//     this.password = passwordHash;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// User.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

module.exports = mongoose.model("User", User);
